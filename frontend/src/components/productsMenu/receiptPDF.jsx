import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

import iconImage from '../../assets/logo/icon.png'; 

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#F47228', // Cambia el color del título
    fontWeight: 'bold', // Agrega negrita
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
  },
  tableContainer: {
    marginTop: 20,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeaderCell: {
    width: '25%',
    textAlign: 'center',
  },
  tableCell: {
    width: '25%',
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

const ReceiptPDF = ({ cartItems, total }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.imageContainer}>
        <Image src={iconImage} style={styles.image} />
      </View>
      
      <Text style={styles.title}>FoodFlow</Text>
      <Text style={styles.text}>Recibo de Compra</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Producto</Text>
          <Text style={styles.tableHeaderCell}>Precio</Text>
          <Text style={styles.tableHeaderCell}>Cantidad</Text>
          <Text style={styles.tableHeaderCell}>Subtotal</Text>
        </View>
        {cartItems.map((item) => (
          <View key={item.id_producto} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.nombre}</Text>
            <Text style={styles.tableCell}>${item.precio.toFixed(2)}</Text>
            <Text style={styles.tableCell}>{item.cantidad}</Text>
            <Text style={styles.tableCell}>${(item.precio * item.cantidad).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text>Total: ${total.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPDF;
