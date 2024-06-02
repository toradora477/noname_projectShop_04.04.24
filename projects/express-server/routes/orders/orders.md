# Abbreviation orders collections

\_id - id замовлення \_\_ObjectId()
i - індивідуальний номер в колекції \_\_Number()
a - автор, який створив замовлення \_\_ObjectId()
t - дата створення \_\_Date()

contactName - ПІБ клієнта
city - місто отримання
address - адреса отримання
deliveryMethod - тип отримання
paymentMethod - тип оплати
recipientName - ПІБ отримувача

_/_ Група списка товарів _/_
products - список товарів та їх кількість \_\_Array() з \_\_Object()
.productId - id продукту \_\_String()
.quantity - кількість \_\_Number()

_/_ Група архівування _/_
ai - архівний номер \_\_Number()
ad - дата архівації (archive flag) \_\_new Date()
at - тип архівації (враження клієнта) \_\_Number() // ! Не всі архіви можуть мати це значення
~ 0 - Успішно
~ 1 - Погано
al - автор архівування \_\_ObjectId()
