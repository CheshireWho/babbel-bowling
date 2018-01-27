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

		// todo: attempt to implement special calculation and delay in filling sum fields for strikes/spares
		// const extraRollsSumStrike = 2;
		// const extraRollsSumSpare = 1;
		// const points = {};

		let currentFrame = 1;
		let currentRoll = 1;
		let hitPinsInFrame = minPinsPerFrame;
		let hitPinsPerRoll = minPinsPerFrame;
		let score = 0;
		let hitPinsVisual;
		let rollCellEl;
		let sumFrameEl;

		// todo: attempt to implement special calculation and delay in filling sum fields for strikes/spares
		// function init() {
		// 	// create object to store points of each role
		// 	for (let i = currentFrame; i <= maxFrames; i++) {
		// 		for (let j = currentRoll; j <= maxRolls; j++) {
		// 			points[`frame${i}`][`roll${j}`] = undefined;
		// 		}
		// 	}
		// }

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
			const symbolStrike = 'X';
			const symbolSpare = '/';
			const symbolMiss = '-';
		
			hitPinsPerRoll = getRandomIntInclusive(minPinsPerFrame, maxPinsPerFrame - hitPinsInFrame);
			hitPinsInFrame += hitPinsPerRoll;

			// todo: attempt to implement special calculation and delay in filling sum fields for strikes/spares
			// store points
			// points[`frame${currentFrame}`][`frame${currentRoll}`] = hitPinsPerRoll;

			// determine symbol to show in scoring table
			switch (true) {
				case hitPinsPerRoll === minPinsPerFrame:
					hitPinsVisual = symbolMiss;
					break;
				case hitPinsInFrame === maxPinsPerFrame:
					hitPinsVisual = currentRoll === minRoll ? symbolStrike : symbolSpare;
					break;
				default:
					hitPinsVisual = hitPinsPerRoll;
			}

			// update scoring table
			rollCellEl = document.getElementById(`frame-${currentFrame}-roll-${currentRoll}`);
			if (rollCellEl) {
				rollCellEl.textContent = hitPinsVisual;
			}

			if (hitPinsVisual === symbolStrike) {
				// no second roll after a strike
				currentRoll++;
			}
			currentRoll++;
		}

		function handleFrameStatus() {
			// if frame has more rolls left, do nothing
			if (currentRoll <= maxRolls) {
				return;
			}

			updateScore();

			// move to next frame
			currentFrame++;
			currentRoll = minRoll;
			hitPinsInFrame = minPinsPerFrame;
		}

		function updateScore() {
			/*
			 todo: attempt to implement special calculation and delay in filling sum fields for strikes/spares

				Replace current function code with:
				Instead of calculating the score only for the current frame and updating the table cell immediately,
				use the `points` object to always loop over ALL frames and check if the score can be calculated
				or has to wait for more rolls.
				Only make a DOM change for empty table cells for performance reasons. Already filled cells will never 
				change their store, hence there is no need to ever update them.
			*/

			score += hitPinsInFrame;

			sumFrameEl = document.getElementById(`sum-${currentFrame}`);
			if (sumFrameEl) {
				sumFrameEl.textContent = score;
			}
		}

		function checkTerminationCondition() {
			if (currentFrame <= maxFrames) {
				// game not done yet
				return;
			}

			button.disabled = true;

			const finalScoreEl = document.getElementById('final-score');
			if (finalScoreEl) {
				finalScoreEl.textContent = score;
			}
		}

		return {
			// todo: attempt to implement special calculation and delay in filling sum fields for strikes/spares
			// init: init,
			play: play
		};
	};

	const game = Game();
	// todo: attempt to implement special calculation and delay in filling sum fields for strikes/spares
	// game.init();

	const button = document.getElementById('btn-play');
	if (button) {
		button.addEventListener('click', game.play);
	}

})();
