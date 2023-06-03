export interface IPasswordConstraints {
	atLeastOneUpperCaseLetter: boolean;
	atLeastOneDigit: boolean;
	atLeastOneSymbol: boolean;
}

export interface ISVGObject {
	[p: string]: {
		attributes: {
			[key: string]: string;
		};
		children: ISVGObject[];
	};
}
