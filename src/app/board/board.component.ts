import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	xIsNext: boolean;
	winner: string;
	tiles: any[];

	draw = false;

	gameOver = false;

	// error message
	errorMessage: string;

	constructor() {}

	ngOnInit() {
		this.startNewGame();
	}

	startNewGame() {
		this.tiles = Array(9).fill(null);
		this.xIsNext = true;
		this.winner = null;
		this.errorMessage = null;
		this.gameOver = false;
	}

	get player() {
		return this.xIsNext ? 'X' : 'O';
	}

	// trigger move of each player
	triggerMove(id: number) {
		if (!this.tiles[id]) {
			this.tiles.splice(id, 1, this.player);

			this.xIsNext = !this.xIsNext;
		}

		let myfilter = this.tiles.filter(item => item !== null);

		if (this.checkForWinner(this.tiles[id])) {
			setTimeout(() => {
				this.winner = this.tiles[id];

				this.gameOver = true;
			}, 700);
		} else if (myfilter.length === 9) {
			setTimeout(() => {
				this.draw = true;

				this.gameOver = true;
			}, 700);
		}
	}

	// check for the winner method
	checkForWinner(move) {
		let result = false;

		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];

			if (this.checkRow(a, b, c, move)) {
				result = true;
			}
		}
		return result;
	}

	// check row
	checkRow(a, b, c, move) {
		let result = false;

		if (
			this.tiles[a] == move &&
			this.tiles[b] == move &&
			this.tiles[c] == move
		) {
			result = true;
		}
		return result;
	}
}
