import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import Noto from '../components/fonts/NotoSans-CondensedMedium.ttf'

Font.register({
    family: 'Noto Sans',
    src: Noto, 
  });

const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Noto Sans', 
    },
    section: {
      marginBottom: 10,
      padding: 6,
      border: "1px solid black",
    },
    heading: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      flex: 1,
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 2,
      textAlign: "center",
    },
    tableCell: {
      fontSize: 8,
    },
  });

const PDFDocument = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Детали заказа</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Время создания:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Оплаченный:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Долг:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Общий:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Описание:</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order?.car?.created_at
                  ? new Date(order.car.created_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order?.paid}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order?.debt}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order?.total}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order?.description}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Информация о клиенте</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Имя Фамилия</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Номер телефона</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Машина</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Километр</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order?.customer?.first_name +
                  " " +
                  order?.customer?.last_name}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order?.customer?.phone_number}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order?.car?.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order?.car_kilometers} км</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Products Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Продукты</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>№</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Имя продукта</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Артикул </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Количество</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Скидка</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Сумма</Text>
            </View>
          </View>
          {order?.products?.map((item, index) => (
            <View style={styles.tableRow} key={item.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.product?.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.product?.code}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.product?.amount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.product?.max_discount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.product?.total_benefit}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Сервисы</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>№</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Сервис</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Сотрудник</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Доля</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Сумма</Text>
            </View>
          </View>
          {order?.services?.map((item, index) => (
            <View style={styles.tableRow} key={item.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.service?.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.staff}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.part}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item?.total}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
