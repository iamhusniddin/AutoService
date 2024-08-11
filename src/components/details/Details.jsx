import React from "react";

function Details() {
  const kirim = [
    "Tovar nomi", 
    "Miqdori",
    "Kelish summasi",
    "Qarz",
    "Yetkazib beruvchi",
    "Umumiy",
    "Holat"
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
    "Holat"
  ]

  const ombor = [
    "Tovar nomi",
    "Artikul",
    "Miqdori",
    "Birlik",
    "Kelish summasi",
    "Qoldiq",
    "Baholangan qiymati",
    "Yetkazib berish",
  ];
  const sotuv = [
    "Tovar nomi",
    "Artikul",
    "Miqdori",
    "Birlik",
    "Sotilish summasi",
    "Foiz%",
    "Chegirma narxi",
    "Nasiya",
    "Naqd to'lov",
    "Klient",
    "Xodim",
  ]
  const xarajatlar = [
    "Turi",
    "Xarajat summa",
    "Sana"
  ]

  return {kirim, sotuv, ombor, xarajatlar, tovar };
}

export default Details;
