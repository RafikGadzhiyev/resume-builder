import _ from "lodash";
import {DECIMAL_TO_HEX} from "../consts/color";
import ReactPDF, {Circle, Path, Rect, Svg} from "@react-pdf/renderer";
import {ISVGObject} from "../interfaces/utils.interface";
import RectProps = ReactPDF.RectProps;
import PathProps = ReactPDF.PathProps;
import CircleProps = ReactPDF.CircleProps;

export const ConvertToMinutes = (n: number) => {
	let minutes = Math.floor(n / 60) % 60;

	return (minutes < 10 ? "0" : "") + minutes;
};

export const ConvertToSeconds = (n: number) => {
	let seconds = n % 60;

	return (seconds < 10 ? "0" : "") + seconds;
};

export const ConvertToHours = (n: number) => {
	let hours = Math.floor(n / 3600);

	return (hours < 10 ? "0" : "") + hours;
};

export const ConvertOpacityToHEXRepresentation = (opacity: number) => {
	const MAX_HEX_VALUE = 255;
	let decimalValue = Math.round(MAX_HEX_VALUE * (opacity / 100));
	let divisionValue = Math.floor(decimalValue / 16), // 16 Because HEX
		remainderValue = decimalValue % 16;
	return DECIMAL_TO_HEX[divisionValue] + DECIMAL_TO_HEX[remainderValue];
};

export const CreateDocumentFromString = (string: string) => {
	return new DOMParser().parseFromString(string, "application/xml");
};

export const SVGToSVGObject = (svg: Element) => {
	const data: ISVGObject = {
		[svg.tagName]: {
			attributes: ConvertNamedNodeMapIntoObject(svg.attributes),
			children: [],
		},
	};

	for (let child of svg.children) {
		data[svg.tagName].children.push(SVGToSVGObject(child));
	}

	return data;
};

export const ConvertNamedNodeMapIntoObject = (
	object: NamedNodeMap
): { [key: string]: string } => {
	const result: { [key: string]: string } = {};
	for (let index in object) {
		let attribute = object[index],
			[name, value] = [attribute.name, attribute.value];
		if (name === undefined || value === undefined) continue;
		result[name] = value;
	}

	return result;
};

export const ConvertSVGObjectIntoJSX = (data: ISVGObject) => {
	for (let tag in data) {
		const children = [];
		for (let child of data[tag].children) {
			children.push(ConvertSVGObjectIntoJSX(child));
		}
		switch (tag) {
			case "svg":
				return (
					<Svg {...data[tag].attributes} key={_.uniqueId()}>
						{children}
					</Svg>
				);
			case "path":
				return (
					<Path
						{...(data[tag].attributes as any as PathProps)}
						key={_.uniqueId()}
					>
						{children}
					</Path>
				);
			case "rect":
				return (
					<Rect
						{...(data[tag].attributes as any as RectProps)}
						key={_.uniqueId()}
					>
						{children}
					</Rect>
				);
			case "circle":
				return (
					<Circle
						{...(data[tag].attributes as any as CircleProps)}
						key={_.uniqueId()}
					>
						{children}
					</Circle>
				);
		}
	}
};
