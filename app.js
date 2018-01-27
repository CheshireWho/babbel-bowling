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

		function play() {
			// roll ball
			hitPinsPerRoll = getRandomIntInclusive(minPinsPerFrame, maxPinsPerFrame - hitPinsInFrame);
			hitPinsInFrame += hitPinsPerRoll;

			// update scoring table
			document.getElementById(`frame-${currentFrame}-roll-${currentRoll}`).textContent = hitPinsPerRoll;

			currentRoll++;
			if (currentRoll > maxRolls) {
				currentFrame++;
				currentRoll = minRoll;
				hitPinsInFrame = minPinsPerFrame;
			}

			checkTerminationCondition();
		}

		// copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		function getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min; 
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
