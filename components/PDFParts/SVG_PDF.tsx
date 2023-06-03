import {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import {ConvertSVGObjectIntoJSX, CreateDocumentFromString, SVGToSVGObject} from "../../utils/convert";
import {PDFViewStyles} from "../../styles/PDFStyles";

interface IProps {
	icon: string;
	data: string;
}

export const SVG_PDF: FC<IProps> = ({icon, data}) => {
	return (
		<View style={{...PDFViewStyles.row, alignItems: "center"}}>
			{ConvertSVGObjectIntoJSX(SVGToSVGObject(CreateDocumentFromString(icon).children[0]))}
			<Text style={PDFViewStyles.text}>{data}</Text>
		</View>
	);
};
