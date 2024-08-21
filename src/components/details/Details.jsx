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
    "Имя",
    "Vincode",
    "Количество",
    "Единство",
    "Сумма поступления",
    "Сумма продажи",
    "Скидка",
    "Мин   количество",
    "Поставщик",
    "Общий",
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
    "Имя",
    "Номер телефона",
    "Долг",
    "Дата",
    "Статус"
  ];

  const xizmatlar = [
    "Тип сервис",
    "Цена",
    "Дата",
    "Статус"
  ];

  const mijozlar = [
    "Имя фамилия",
    "Номер телефона",
    "Паспорт серии",
    "Долг",
    "Адрес",
    "Статус"
  ];

  const avtomobillar = [
    "Имя",
    "Vincode",
    "Бренд",
    "Цвет",
    "Гос номер",
    "Клиент",
    "Дата",
    "Статус"
  ];

  const xodimlar = [
    "Усернаме",
    "Имя",
    "Фамилия",
    "Номер телефона",
    "Профессия",
    "Зарплата",
    "Рабочее время",
  ]
  
  const xarajatlar = [
    "Вид расходов",
    "Цена",
    "Описание",
    "Дата",
  ]

  return {kirim, tovar, buyurtmalar, taminlovchi, xizmatlar, mijozlar, avtomobillar, xodimlar, xarajatlar };
}

export default Details;
