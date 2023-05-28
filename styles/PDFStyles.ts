import { StyleSheet } from "@react-pdf/renderer";

export const PDFViewStyles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#1c1c1e",
    color: "#fff",
    gap: "10px",
    fontFamily: "Helvetica",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    gap: "2.5px 5px",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: "10px",
    paddingRight: "5px",
  },

  tag: {
    borderRadius: "2.5px",
    padding: "2.5px 5px",
    backgroundColor: "#1c1c1e",
    position: "relative",
    fontSize: "7px",
  },
  language: {
    marginVertical: "20px 7.5px",
    fontSize: "12px",
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
  },
  italicText: {
    fontFamily: "Helvetica-Oblique",
  },
  title: {
    fontSize: "20px",
    textTransform: "capitalize",
  },
  dataTitle: {
    fontSize: "14px",
    marginTop: "10px",
  },

  text: {
    fontSize: "10px",
  },
  extraText: {
    color: "rgb(255 255 255 / .5)",
    fontSize: "8px",
  },
  personalDataBlock: {
    backgroundColor: "#262626",
    borderRadius: "10px",
    width: "25%",
    padding: "5px",
    height: "100%",
  },

  mainDataBlock: {
    backgroundColor: "#262626",
    borderRadius: "10px",
    width: "75%",
    padding: "5px",
  },
  dataBlock: {
    marginVertical: "10px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
    alignItems: "flex-end",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
});
