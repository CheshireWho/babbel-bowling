/*
 Create scope with an immediately invoked function expression
 to avoid polluting the global scope.
 (Not really useful here, but it would be in a big application.)
*/
(function IIFE() {

	// I chose the module pattern to keep implementation details private.
	function Game() {
		const maxFrames = 10;
		const maxRolls = 2;
		const minRoll = 1;
		const maxPinsPerFrame = 10;
		const minPinsPerFrame = 0;

		let currentFrame = 1;
		let currentRoll = 1;
		let hitPinsInFrame = minPinsPerFrame;
		let hitPinsPerRoll = minPinsPerFrame;
		let hitPinsVisual;

		function play() {
			roll();

			handleFrameStatus();

			checkTerminationCondition();
		}

		// copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		function getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min; 
		}

		function roll() {
			let isStrike = false;

			hitPinsPerRoll = getRandomIntInclusive(minPinsPerFrame, maxPinsPerFrame - hitPinsInFrame);
			hitPinsInFrame += hitPinsPerRoll;

			// determine symbol to show in scoring table
			switch (true) {
				case hitPinsPerRoll === minPinsPerFrame:
					hitPinsVisual = '-';
					break;
				case hitPinsInFrame === maxPinsPerFrame:
					if (currentRoll === minRoll) {
						hitPinsVisual = 'X';
						isStrike = true;
					} else {
						hitPinsVisual = '/';
					}
					
					break;
				default:
					hitPinsVisual = hitPinsPerRoll;
			}

			// update scoring table
			document.getElementById(`frame-${currentFrame}-roll-${currentRoll}`).textContent = hitPinsVisual;

			if (isStrike) {
				// no second roll after a strike
				currentRoll++;
				isStrike = false;
			}
			currentRoll++;
		}

		function handleFrameStatus() {
			// check if all rolls for this frame are done
			if (currentRoll > maxRolls) {

				// move to next frame
				currentFrame++;
				currentRoll = minRoll;
				hitPinsInFrame = minPinsPerFrame;
			}
		}

		function checkTerminationCondition() {
			if (currentFrame > maxFrames) {
				button.disabled = true;
			}
		}

		return {
			play: play
		};
	};

	const game = Game();

	const button = document.getElementById('btn-play');
	if (button) {
		button.addEventListener('click', game.play);
	}

})();
