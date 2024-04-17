import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../images/logo.png";
// Import your background image
import backgroundImage from "../images/bg.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f9f7f1",
  },
  background: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center", // Use alignItems to center items horizontally in the container
    zIndex: 2, // Ensure logo container is above the background
  },
  section: {
    marginTop: 0,
    padding: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 10,
    marginHorizontal: 40,
    backgroundColor: "#f9f7f1",
    zIndex: 2, // Ensure section is above the background
  },
  formattedText: {
    fontSize: 12,
    marginTop: -30,
  },
  logo: {
    width: 150,
    height: 150,
    objectFit: "contain",
  },
});

// Create Document Component
const PDFDocument = ({ plainText }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.background}>
          <Image style={{ width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} source={backgroundImage} />
        </View>
        <View>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} />
          </View>
          <View style={styles.section}>
            <Text style={styles.formattedText}>{plainText}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
