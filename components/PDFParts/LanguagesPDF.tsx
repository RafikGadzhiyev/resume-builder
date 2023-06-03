import {FC, Fragment} from "react";
import {PDFViewStyles} from "../../styles/PDFStyles";
import {Text, View} from "@react-pdf/renderer";
import {ILanguage} from "../../interfaces/resume.interface";

interface IProps {
	languages: ILanguage[];
}

export const LanguagesPDF: FC<IProps> = ({languages}) => {
	return (
		<View style={PDFViewStyles.dataBlock}>
			<Text style={PDFViewStyles.title}>Languages</Text>
			<View>
				{languages.map((language: ILanguage) => (
					<Fragment key={language.id}>
						<Text style={PDFViewStyles.language}>{language.language}</Text>
						<Text
							style={{
								...PDFViewStyles.extraText,
								...PDFViewStyles.boldText,
							}}
						>
							{language.level}
						</Text>
					</Fragment>
				))}
			</View>
		</View>
	);
};
