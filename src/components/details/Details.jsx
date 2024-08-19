import React from "react";

function Details() {
  const kirim = [
    "Название продукта", 
    "Количество",
    "Сумма поступления",
    "Долг",
    "Поставщик",
    "Общий",
    "Статус"
  ];

  const tovar = [
    "Tovar nomi",
    "Artikul",
    "Miqdori",
    "Birlik",
    "Kelish summasi",
    "Sotish summasi",
    "Chegirma",
    "Minimal miqdor",
    "Yetkazib beruvchi",
    "Umumiy",
    "Holat"
  ];

  const buyurtmalar = [
    "Xaridor",
    "ID",
    "To'langan",
    "Qarz",
    "Umumiy",
    "Holat"
  ];

  const taminlovchi = [
    "Ism",
    "Telefon raqam",
    "Qarz",
    "Holat"
  ];

  const xizmatlar = [
    "Xizmat turi",
    "Narxi",
    "Holat"
  ];

  const mijozlar = [
    "Ism familiya",
    "Telefon raqam",
    "Qarz",
    "Manzil",
    "Holat"
  ];

  const avtomobillar = [
    "Kod",
    "Nomi",
    "Brand",
    "Rangi",
    "Davlat raqami",
    "Xaridor",
    "Holat"
  ];

  const xodimlar = [
    "Username",
    "Ism",
    "Familiya",
    "Telefon raqam",
    "Kasbi",
    "Maosh",
    "Ish vaqti",
    "Holat"
  ]
  
  const xarajatlar = [
    "Xarajat turi",
    "Narxi",
    "Tavsif",
    "Holat"
  ]

  return {kirim, tovar, buyurtmalar, taminlovchi, xizmatlar, mijozlar, avtomobillar, xodimlar, xarajatlar };
}

export default Details;
