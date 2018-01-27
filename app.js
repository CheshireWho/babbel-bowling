/*
 Create scope with an immediately invoked function expression
 to avoid polluting the global scope.
 (Not really useful here, but it would be in a big application.)
*/
(function IIFE() {

	// I chose the module pattern to keep implementation details private.
	function Game() {
		let count = 0;

		function play() {
			count++;
			console.log('playing ' + count);
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
