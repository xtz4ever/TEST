<?php

namespace frontend\models;

use Yii;
use yii\base\Model;


class LangTextForSite extends Model
{
    public function actionTEXT($action)
    {
        $text = [];

        switch ($action) {

            case 'takeorder-provider':

                if (Yii::$app->language == 'ru-RU') {

                    $text['Currency'] = 'Валюта';
                    $text['accept_order'] = 'все верно, я принимаю заказ';
                    $text['Annulment'] = 'отмена';
                    $text['type'] = 'Тип';
                    $text['total_cost'] = 'Общая стоимость';
                    $text['wallet_name'] = 'wallet_name_ru';

                    $text['h2_text'] = 'Личный кабинет поставщика';
                    $text['profile'] = 'Трубуются аккаунты для активации';


                } else {

                    $text['Currency'] = 'Currency';
                    $text['accept_order'] = 'All right, I accept the order';
                    $text['Annulment'] = 'Annulment';
                    $text['type'] = 'Type';
                    $text['total_cost'] = 'total cost';
                    $text['wallet_name'] = 'wallet_name_en';

                    $text['h2_text'] = " Vendor's personal account ";
                    $text['profile'] = 'Accounts to activate';


                }
                return $text;
                break;

            case 'view-accounts':

                if (Yii::$app->language == 'en-EN') {
                    $text['account_info'] = 'Account';
                    $text['order_id'] = 'Orders ID';
                    $text['accounts_for_return'] = 'Accounts for replacement';
                    $text['go_back'] = 'Go back';
                } else {
                    $text['account_info'] = 'Аккаунт';
                    $text['order_id'] = 'ID ордера';
                    $text['accounts_for_return'] = 'Аккаунты на замену';
                    $text['go_back'] = 'Назад';
                }
                return $text;
                break;

            case 'view-order':

                if (Yii::$app->language == 'en-EN') {
                    $text['type'] = 'Account type: ';
                    $text['quantity'] = 'Quantity: ';
                    $text['price'] = 'Price: ';
                    $text['total'] = 'Total: ';
                    $text['date'] = 'Date: ';
                    $text['status'] = 'Status: ';
                    $text['view_bad_accounts'] = 'Problem accounts: ';
                    $text['go_back'] = 'Go back';
                    $text['order_details'] = 'Order details №: ';
                    $text['link'] = 'Link ';

                } else {
                    $text['type'] = 'Тип аккаунтов: ';
                    $text['quantity'] = 'Объем: ';
                    $text['price'] = 'Цена: ';
                    $text['total'] = 'Всего сделано: ';
                    $text['date'] = 'Дата: ';
                    $text['status'] = 'Статус: ';
                    $text['view_bad_accounts'] = 'Проблемные аккаунты: ';
                    $text['go_back'] = 'В личный кабинет';
                    $text['order_details'] = 'Подробная информация по заказу №: ';
                    $text['link'] = 'Ссылка ';

                }
                return $text;
                break;

            case 'personal-provider-payments':
                if (Yii::$app->language == 'en-EN') {


                    $text['suggest_my_accounts'] = 'Suggest my accounts';
                    $text['type'] = 'A type';
                    $text['scope'] = 'Scope';
                    $text['price_per_unit'] = 'Price per unit';
                    $text['cost'] = 'Cost';
                    $text['action'] = 'Action';
                    $text['execute'] = 'Execute';
                    $text['ticket'] = 'Ticket';
                    $text['payment_of_orders'] = 'Payment of orders';
                    $text['deduction_of_orders'] = 'Deduction of orders';


                    $text['date'] = 'Date';
                    $text['wallet'] = 'Wallet';
                    $text['to_pay'] = 'Payment Amount';
                    $text['comment'] = 'A comment';
                    $text['filter_orders'] = 'Count';
                    $text['filter_orders_reset'] = 'Reset';


                    $text['status_0'] = 'In the work';
                    $text['status_1'] = 'Sale';
                    $text['status_2'] = 'Waiting for activation';
                    $text['status_3'] = 'Not paid';
                    $text['status_4'] = 'Paid for';
                    $text['status_5'] = 'Rejected';
                    $text['status_6'] = 'All';
                    $text['status_7'] = 'Deducted';
                    $text['status_8'] = 'Returns';
                    $text['status_9'] = 'Zero';

                    $text['action_account_status_0'] = 'Download';
                    $text['action_account_status_1_3_4'] = 'View';
                    $text['action_account_status_5'] = 'Rejected';

                    $text['paid_status_0'] = ' No ';
                    $text['paid_status_1'] = ' Yes ';

                    $text['paid_status_2_title'] = ' Remove an order from the table ';

                    $text['profile_1'] = ' Accounts to activate ';
                    $text['profile_2'] = ' Payout statistics ';
                    $text['profile_3'] = ' Returns';

                    $text['h2_text'] = " Vendor's personal account ";

                    $text['statistic_money_text_1'] = 'Unpaid orders on the page';
                    $text['statistic_money_text_2'] = 'Unpaid orders total';
                    $text['statistic_money_text_3'] = 'To the nearest payment';

                } else {
                    $text['suggest_my_accounts'] = 'Предложить свои аккаунты';
                    $text['type'] = 'Тип';
                    $text['scope'] = 'Объем';
                    $text['price_per_unit'] = 'Цена за шт';
                    $text['cost'] = 'Стоимость';
                    $text['action'] = 'Действие';
                    $text['execute'] = 'Выполнить';
                    $text['ticket'] = 'Тикет';

                    $text['payment_of_orders'] = 'Оплата заказов';
                    $text['deduction_of_orders'] = 'Вычет заказов';


                    $text['date'] = 'Дата';
                    $text['wallet'] = 'Кошелек';
                    $text['to_pay'] = 'Сумма';
                    $text['comment'] = 'Комментарий';
                    $text['filter_orders'] = 'Посчитать';
                    $text['filter_orders_reset'] = 'Сбросить';


                    $text['status_0'] = 'В работе';
                    $text['status_1'] = 'Продажа';
                    $text['status_2'] = 'Ждет активации';
                    $text['status_3'] = 'Не оплачен';
                    $text['status_4'] = 'Оплачен';
                    $text['status_5'] = 'Отклонен';
                    $text['status_6'] = 'Все';
                    $text['status_7'] = 'Вычтенные';
                    $text['status_8'] = 'Возвраты';
                    $text['status_9'] = 'Нулевые';

                    $text['action_account_status_0'] = 'Загрузить';
                    $text['action_account_status_1_3_4'] = 'Посмотреть';
                    $text['action_account_status_5'] = 'Отклонен';

                    $text['paid_status_0'] = ' Нет ';
                    $text['paid_status_1'] = ' Да ';

                    $text['paid_status_2_title'] = ' Удалить заказ из таблицы ';

                    $text['profile_1'] = ' Трубуются аккаунты для активации ';
                    $text['profile_2'] = ' Статистика выплат ';

                    $text['profile_3'] = ' Возвраты';


                    $text['h2_text'] = ' Личный кабинет поставщика ';

                    $text['statistic_money_text_1'] = 'Неоплаченных заказов на странице';
                    $text['statistic_money_text_2'] = 'Неоплаченных заказов всего';
                    $text['statistic_money_text_3'] = 'К ближайшей выплате';

                }

                return $text;
                break;


            case 'personal-provider':

                if (Yii::$app->language == 'en-EN') {


                    $text['suggest_my_accounts'] = 'Suggest my accounts';
                    $text['type'] = 'A type';
                    $text['scope'] = 'Scope';
                    $text['price_per_unit'] = 'Price per unit';
                    $text['cost'] = 'The amount of the deduction';
                    $text['cost_2'] = 'Amount';
                    $text['action'] = 'Action';
                    $text['execute'] = 'Execute';
                    $text['ticket'] = 'Ticket';


                    $text['id'] = 'ID';
                    $text['date'] = 'Date';
                    $text['status'] = 'Status';
                    $text['action_account_status'] = 'Accounts';
                    $text['it_was_accounts/left_accounts'] = 'Made/Left';
                    $text['to_pay'] = 'Payment Amount';
                    $text['paid_status'] = 'Paid';
                    $text['filter_orders'] = 'Apply Filter';

                    $text['status_0'] = 'In the work';
                    $text['status_1'] = 'Sale';
                    $text['status_2'] = 'Waiting for activation';
                    $text['status_3'] = 'Not paid';
                    $text['status_4'] = 'Paid for';
                    $text['status_5'] = 'Rejected';
                    $text['status_6'] = 'All';
                    $text['status_7'] = 'Deducted';
                    $text['status_8'] = 'Returns';
                    $text['status_9'] = 'Zero';

                    $text['action_account_status_0'] = 'Download';
                    $text['action_account_status_1_3_4'] = 'View';
                    $text['action_account_status_5'] = 'Rejected';

                    $text['paid_status_0'] = ' No ';
                    $text['paid_status_1'] = ' Yes ';

                    $text['paid_status_2_title'] = ' Remove an order from the table ';

                    $text['profile_1'] = ' Accounts to activate ';
                    $text['profile_2'] = ' Statistics ';
                    $text['profile_3'] = ' Returns';

                    $text['h2_text'] = " Vendor's personal account ";

                    $text['statistic_money_text_1'] = 'Unpaid orders on the page';
                    $text['statistic_money_text_2'] = 'Unpaid orders total';
                    $text['statistic_money_text_3'] = 'To the nearest payment';
                    $text['statistic_money_text_4'] = 'Total paid';

                } else {
                    $text['suggest_my_accounts'] = 'Предложить свои аккаунты';
                    $text['type'] = 'Тип';
                    $text['scope'] = 'Объем';
                    $text['price_per_unit'] = 'Цена за шт';
                    $text['cost'] = 'Сумма вычета';
                    $text['cost_2'] = 'Сумма';
                    $text['action'] = 'Действие';
                    $text['execute'] = 'Выполнить';
                    $text['ticket'] = 'Тикет';

                    $text['id'] = 'ID';
                    $text['date'] = 'Дата';
                    $text['status'] = 'Статус';
                    $text['action_account_status'] = 'Аккаунты';
                    $text['it_was_accounts/left_accounts'] = 'Было/осталось';
                    $text['to_pay'] = 'К оплате';
                    $text['paid_status'] = 'Оплачено';
                    $text['filter_orders'] = 'Показать';

                    $text['status_0'] = 'В работе';
                    $text['status_1'] = 'Продажа';
                    $text['status_2'] = 'Ждет активации';
                    $text['status_3'] = 'Не оплачен';
                    $text['status_4'] = 'Оплачен';
                    $text['status_5'] = 'Отклонен';
                    $text['status_6'] = 'Все';
                    $text['status_7'] = 'Вычтенные';
                    $text['status_8'] = 'Возвраты';
                    $text['status_9'] = 'Нулевые';

                    $text['action_account_status_0'] = 'Загрузить';
                    $text['action_account_status_1_3_4'] = 'Посмотреть';
                    $text['action_account_status_5'] = 'Отклонен';

                    $text['paid_status_0'] = ' Нет ';
                    $text['paid_status_1'] = ' Да ';

                    $text['paid_status_2_title'] = ' Удалить заказ из таблицы ';

                    $text['profile_1'] = ' Трубуются аккаунты для активации ';
                    $text['profile_2'] = ' Статистика ';

                    $text['profile_3'] = ' Возвраты';


                    $text['h2_text'] = ' Личный кабинет поставщика ';

                    $text['statistic_money_text_1'] = 'Неоплаченных заказов на странице';
                    $text['statistic_money_text_2'] = 'Неоплаченных заказов всего';
                    $text['statistic_money_text_3'] = 'К ближайшей выплате';
                    $text['statistic_money_text_4'] = 'Всего выплачено';

                }
                return $text;
                break;


            case 'suggest-provider' :
            case 'upload-account' :

                if (Yii::$app->language == 'ru-RU') {

                    $text['provider_account_id'] = '<b>Тип </b> ( выбрать из списка )';
                    $text['account_name_prompt'] = 'Выберите продукт';
                    $text['account_type_verification'] = 'Формат аккаунтов';
                    $text['account_type'] = 'Тип';
                    $text['quntity'] = 'Объем';
                    $text['price_for_all'] = 'Цена за партию в $';
                    $text['price_for_one'] = 'Цена за шт. в $';
                    $text['date'] = 'Дата готовности';
                    $text['wallet_id'] = 'Валюта';
                    $text['text'] = 'Комментарий';
                    $text['wallet_name'] = 'wallet_name_ru';
                    $text['order_number'] = 'Заказ №';
                    $text['button'] = 'Загрузить';

                    $text['download_ready_account'] = 'Загрузка файла готовых аккаунтов';
                    $text['accounts_format'] = 'Формат';

                    $text['button_yes'] = 'Все верно, я принимаю заказ';
                    $text['button_no'] = 'Отменить';
                    $text['h2_text'] = ' Личный кабинет поставщика ';
                    $text['profile'] = ' Предложить свои аккаунты на продажу ';


                } else {

                    $text['provider_account_id'] = '<b>Type</b> ( choose from the list )';
                    $text['account_name_prompt'] = 'Select product';
                    $text['account_type_verification'] = 'Account format';
                    $text['account_type'] = 'Type';
                    $text['quntity'] = 'Quntity';
                    $text['price_for_all'] = 'Price for all in $';
                    $text['price_for_one'] = 'Price for one in $';
                    $text['date'] = 'Date of readiness';
                    $text['wallet_id'] = 'Currency';
                    $text['text'] = 'A comment';
                    $text['wallet_name'] = 'wallet_name_en';
                    $text['order_number'] = 'Order №';
                    $text['button'] = 'Upload';

                    $text['download_ready_account'] = 'Download ready-made account file';
                    $text['accounts_format'] = 'Format';

                    $text['button_yes'] = 'All right, I accept the order';
                    $text['button_no'] = 'Cancel';
                    $text['h2_text'] = " Vendor's personal account ";
                    $text['profile'] = ' Suggest my accounts for sale ';
                }
                return $text;
                break;


            case 'index':

                if (Yii::$app->language == 'en-EN') {

                    $text['service'] = 'SERVICE';
                    $text['quantity'] = 'Quantity';
                    $text['price_for'] = 'PRICE FOR';
                    $text['1k_accounts'] = 'ACCOUNTS';
                    $text['account'] = 'ACCOUNT';
                    $text['buy'] = 'Buy';
                    $text['soc_seti_text'] = 'Share the link to the service in your social networks';
                    $text['account_categories'] = 'Account categories';
                    $text['scroll_down'] = 'Scroll down';
                    $text['nevalid_acc'] = 'Questions about the invalid account, about the price politics, accounts in other services – please, contact us to the e-mail: ';
                    $text['nevalid_acc_2'] = 'Attention: claims of account validity only at the day of purchase and a few days after registration.';
                    $text['form_need_acc_header'] = 'If the store does not have the required number of accounts, or we have not yet added the kind of accounts that you need, fill out this form and we will contact you';
                    $text['success_message'] = 'Message sent , Our manager will contact you';
                    $text['form_button'] = 'Send';

                    $text['modal_form_text_1'] = 'Unfortunately, at the moment we do not have the required number of accounts:';
                    $text['modal_form_text_2'] = 'Write your e-mail and the desired amount.';
                    $text['modal_form_text_3'] = 'Our manager will contact you soon.';
                    $text['modal_form_button'] = 'Send request';

                    $text['account_type'] = 'Account types';
                    $text['account_all'] = 'All';
                    $text['account_brut'] = 'Brute force ';
                    $text['account_autoregi'] = 'Auto reg';

                    $text['podskazka_1'] = 'Some text по 1 шт';
                    $text['podskazka_1000'] = 'Some text по 1000 шт';

                } else {
                    $text['service'] = 'СЕРВИС';
                    $text['quantity'] = 'КОЛИЧЕСТВО';
                    $text['price_for'] = 'ЦЕНА ЗА';
                    $text['1k_accounts'] = 'АККАУНТОВ';
                    $text['account'] = 'АККАУНТ';
                    $text['buy'] = 'Купить';
                    $text['soc_seti_text'] = 'Поделитесь ссылкой на сервис в своих социальных сетях';
                    $text['account_categories'] = 'Категории аккаунтов';
                    $text['scroll_down'] = 'Листайте';
                    $text['nevalid_acc'] = 'По поводу невалида аккаунтов, по вопросам цен объемов, аккаунтов в других сервисах - пишите на почту';
                    $text['nevalid_acc_2'] = 'Внимание: претензии валидности аккаунтов только в день покупки и несколько дней после регистрации';
                    $text['form_need_acc_header'] = 'Если в магазине нет нужного Вам количества аккаунтов или мы еще не добавили вид аккаунтов который Вам нужен, заполните данную форму и мы с Вами свяжемся';
                    $text['success_message'] = 'Сообщение отправлено , Наш менеджер свяжется с Вами';
                    $text['form_button'] = 'Oтправить';

                    $text['modal_form_text_1'] = 'К сожалению, на данный момент у нас нет нужного количества аккаунтов:';
                    $text['modal_form_text_2'] = 'Напишите Ваш e-mail и желаемое количество.';
                    $text['modal_form_text_3'] = 'Наш менеджер свяжется с вами в ближайшее время.';
                    $text['modal_form_button'] = 'Oтправить запрос';

                    $text['podskazka_1'] = 'Какой-то текст по 1 шт';
                    $text['podskazka_1000'] = 'Какой-то текст по 1000 шт';

                    $text['account_type'] = 'Тип аккаунтов';
                    $text['account_all'] = 'Всё';
                    $text['account_brut'] = 'Брут';
                    $text['account_autoregi'] = 'Автореги';


                }
                return $text;
                break;

            case 'akkaunty':

                if (Yii::$app->language == 'ru-RU') {

                    $text['service'] = 'СЕРВИС';
                    $text['quantity'] = 'КОЛИЧЕСТВО';
                    $text['price_for'] = 'ЦЕНА ЗА';
                    $text['1k_accounts'] = 'АККАУНТОВ';
                    $text['account'] = 'АККАУНТ';
                    $text['buy'] = 'Купить';
                    $text['soc_seti_text'] = 'Поделитесь ссылкой на сервис в своих социальных сетях';
                    $text['account_categories'] = 'Категории аккаунтов';
                    $text['scroll_down'] = 'Листайте';
                    $text['nevalid_acc'] = 'По поводу невалида аккаунтов, по вопросам цен объемов, аккаунтов в других сервисах - пишите на почту';
                    $text['nevalid_acc_2'] = 'Внимание: претензии валидности аккаунтов только в день покупки и несколько дней после регистрации';
                    $text['form_need_acc_header'] = 'Если в магазине нет нужного Вам количества аккаунтов или мы еще не добавили вид аккаунтов который Вам нужен, заполните данную форму и мы с Вами свяжемся';
                    $text['success_message'] = 'Сообщение отправлено , Наш менеджер свяжется с Вами';
                    $text['form_button'] = 'Oтправить';

                    $text['modal_form_text_1'] = 'К сожалению, на данный момент у нас нет нужного количества аккаунтов:';
                    $text['modal_form_text_2'] = 'Напишите Ваш e-mail и желаемое количество.';
                    $text['modal_form_text_3'] = 'Наш менеджер свяжется с вами в ближайшее время.';
                    $text['modal_form_button'] = 'Oтправить запрос';

                    $text['text_h1'] = 'Купить аккаунты';

                } else {

                    $text['service'] = 'SERVICE';
                    $text['quantity'] = 'QUANTITY';
                    $text['price_for'] = 'PRICE FOR';
                    $text['1k_accounts'] = 'ACCOUNTS';
                    $text['account'] = 'ACCOUNT';
                    $text['buy'] = 'Buy';
                    $text['soc_seti_text'] = 'Share the link to the service in your social networks';
                    $text['account_categories'] = 'Account categories';
                    $text['scroll_down'] = 'Scroll down';
                    $text['nevalid_acc'] = 'Regarding the invalid account, for volume issues, accounts in other services - write to the mail';
                    $text['nevalid_acc_2'] = 'Attention: claims of account validity only on the day of purchase and several days after registration';
                    $text['form_need_acc_header'] = 'If the store does not have the required number of accounts, or we have not yet added the kind of accounts that you need, fill out this form and we will contact you';
                    $text['success_message'] = 'Message sent , Our manager will contact you';
                    $text['form_button'] = 'Send';

                    $text['modal_form_text_1'] = 'Unfortunately, at the moment we do not have the required number of accounts:';
                    $text['modal_form_text_2'] = 'Write your e-mail and the desired amount.';
                    $text['modal_form_text_3'] = 'Our manager will contact you soon.';
                    $text['modal_form_button'] = 'Send request';

                    $text['text_h1'] = 'Buy Accounts';
                }
                return $text;
                break;

            case 'buyakkaynt':

                if (Yii::$app->language == 'ru-RU') {

                    $text['text_form_1'] = 'Вы собираетесь приобрести';
                    $text['text_form_2'] = 'К оплате';
                    $text['text_form_3'] = 'Есть промо-код?';
                    $text['text_form_4'] = 'Я согласен c ';
                    $text['text_form_5'] = 'условиями покупки аккаунтов';
                    $text['text_form_6'] = 'Я понимаю, что претензии по аккаунтам принимаются только в первые 24 часа после покупки';
                    $text['text_form_7'] = '*Ссылка на получение аккаунтов будет отправлена на указанный Вами E-mail.';
                    $text['text_form_8'] = 'Отправить запрос';
                    $text['promo_error'] = 'Промо-код не активен';
                    $text['promo_success'] = 'Скидка составляет';


                } else {

                    $text['text_form_1'] = 'You are going to purchase';
                    $text['text_form_2'] = 'To pay';
                    $text['text_form_3'] = 'Have a promo code?';
                    $text['text_form_4'] = 'I agree with ';
                    $text['text_form_5'] = 'terms of purchase of accounts';
                    $text['text_form_6'] = 'I understand that account claims are only accepted within 24 hours of purchase';
                    $text['text_form_7'] = '*The link to receive accounts will be sent to your e-mail.';
                    $text['text_form_8'] = 'Send request';
                    $text['promo_error'] = 'Promotional code is not active';
                    $text['promo_success'] = 'Discount is';

                }
                return $text;
                break;
            case 'feedbacks':

                if (Yii::$app->language == 'ru-RU') {

                    $text['leave_a_review'] = 'Оставьте отзыв:';
                    $text['create'] = 'Создать';
                    $text['h4'] = 'Нам очень важно Ваше мнение!';
                    $text['p_1'] = 'Оставьте отзыв на одном из ресурсов. Для нас важен каждый отзыв для анализа или устраниения ошибок в будущем.';
                    $text['success_message'] = 'Ваш отзыв отправелен на модерацию. Спасибо.';

                } else {

                    $text['leave_a_review'] = 'Leave a review:';
                    $text['create'] = 'Create';
                    $text['h4'] = 'Your opinion is very important to us!';
                    $text['p_1'] = 'Leave a review on one of the resources. Each feedback is important for us to analyze or eliminate errors in the future.';
                    $text['success_message'] = 'Your feedback has been sent to moderation. Thank you.';
                }
                return $text;
                break;

            case 'createcontacts':

                if (Yii::$app->language == 'ru-RU') {

                    $text['leave_a_review'] = 'Остались вопросы ?';
                    $text['create'] = 'Создать';
                    $text['h4'] = 'Контактная информация';
                    $text['p_1'] = 'Оставьте отзыв на одном из ресурсов. Для нас важен каждый отзыв для анализа или устраниения ошибок в будущем.';
                    $text['p_2'] = 'Если у Вас остались вопросы - заполните форму ниже и мы постараемся Вам помочь, и ответить на все вопросы.';
                    $text['success_message'] = 'Ваш отзыв отправелен на модерацию. Спасибо.';
                    $text['support'] = 'Техническая поддержка';

                } else {

                    $text['leave_a_review'] = 'Still have questions?';
                    $text['create'] = 'Create';
                    $text['h4'] = 'Contact Information';
                    $text['p_1'] = 'Leave a review on one of the resources. Each feedback is important for us to analyze or eliminate errors in the future.';
                    $text['p_2'] = 'If you have any questions - fill out the form below and we will try to help you, and answer all questions.';
                    $text['success_message'] = 'Your feedback has been sent to moderation. Thank you.';
                    $text['support'] = 'Technical support';
                }
                return $text;
                break;

            case 'conditions':

                if (Yii::$app->language == 'ru-RU') {

                    $text['leave_a_review'] = 'Условия продажи аккаунтов и редиректов';
                    $text['leave_a_review_2'] = 'Контакты';
                    $text['create'] = 'Создать';
                    $text['h4'] = 'Контактная информация';
                    $text['p_1'] = 'Отзывы:';
                    $text['p_2'] = 'Просьба оставлять отзывы в топика:';
                    $text['success_message'] = 'Ваш отзыв отправелен на модерацию. Спасибо.';
                    $text['support'] = 'Техническая поддержка';

                } else {

                    $text['leave_a_review'] = 'Conditions of accounts and redirects';
                    $text['leave_a_review_2'] = 'Contacts';
                    $text['create'] = 'Create';
                    $text['h4'] = 'Contact Information';
                    $text['p_1'] = 'Reviews:';
                    $text['p_2'] = 'Please leave comments in the topic:';
                    $text['success_message'] = 'Your feedback has been sent to moderation. Thank you.';
                    $text['support'] = 'Technical support';
                }
                return $text;
                break;


            case 'signup-partner':

                if (Yii::$app->language == 'ru-RU') {

                    $text['registration'] = 'Регистрация';
                    $text['registration_button'] = 'Зарегистрироваться';
                    $text['username'] = 'Логин';
                    $text['email'] = 'Эл. адрес';
                    $text['password'] = 'Пароль';


                } else {

                    $text['registration'] = 'Registration';
                    $text['registration_button'] = 'Sign Up';
                    $text['username'] = 'Username';
                    $text['email'] = 'Email';
                    $text['password'] = 'Password';
                }
                return $text;
                break;

            case 'login-partner':
            case 'login-provider':
                if (Yii::$app->language == 'ru-RU') {

                    $text['email'] = 'Эл. адрес';
                    $text['registration'] = 'Авторизация';
                    $text['registration_button'] = 'Авторизироваться';
                    $text['username'] = 'Логин';
                    $text['forgot_your_password'] = 'Забыли пароль ?';
                    $text['password'] = 'Пароль';
                    $text['access_error'] = 'У вас нет прав для доступа !';
                    $text['new_provider'] = 'Регистрация';


                } else {

                    $text['email'] = 'Email';
                    $text['registration'] = 'Authorization';
                    $text['registration_button'] = 'Sign Up';
                    $text['username'] = 'Username';
                    $text['forgot_your_password'] = 'Forgot your password ?';
                    $text['password'] = 'Password';
                    $text['access_error'] = 'You do not have permission to access !';
                    $text['new_provider'] = 'Registration';
                }
                return $text;
                break;

            case 'password-reset-partner':
            case 'reset-password-provider':

                if (Yii::$app->language == 'ru-RU') {

                    $text['registration'] = 'Изменить пароль';
                    $text['registration_button'] = 'Получить';
                    $text['username'] = 'Логин';
                    $text['forgot_your_password'] = 'Забыли пароль ?';
                    $text['text_get_new_password'] = 'После заполнения и отправки формы проверьте Ваш почтовый ящик, Вам придет письмо в котором находятся дальнейшие инструкции для сброса пароля.';
                    $text['access_error'] = 'У вас нет прав для доступа !';
                    $text['email'] = 'эл. адрес';
                    $text['password'] = 'пароль';


                } else {

                    $text['registration'] = 'Update Password';
                    $text['registration_button'] = 'Get new password';
                    $text['username'] = 'Username';
                    $text['forgot_your_password'] = 'Forgot your password ?';
                    $text['text_get_new_password'] = 'After filling out and submitting the form, check your mail box, you will receive an email containing further instructions for resetting the password.';
                    $text['access_error'] = 'You do not have permission to access !';
                    $text['email'] = 'email';
                    $text['password'] = 'password';
                }
                return $text;
                break;

            case 'reset-password':

                if (Yii::$app->language == 'ru-RU') {

                    $text['new_pass'] = 'Пожалуйста введите новый пароль';
                    $text['registration_button'] = 'Сохранить';


                } else {

                    $text['new_pass'] = 'Please choose your new password:';
                    $text['registration_button'] = 'Save';

                }
                return $text;
                break;

            case 'personal-area':

                if (Yii::$app->language == 'ru-RU') {


                    $text['h2_text'] = 'Личный кабинет партнера';  /*Виджет*/
                    $text['partner_link_text'] = 'Ваша партнерская ссылка:';  /*Виджет*/
                    $text['update_link_button'] = 'Изменить';  /*Виджет*/
                    $text['error_link_isset'] = 'Такая ссылка уже существует';  /*Виджет*/
                    $text['success_link_save'] = 'Ссылка сохранена';  /*Виджет*/

                    // основная форма
                    $text['error_update_form'] = 'Ошибка. Данные не обновлены';
                    $text['success_update_form'] = 'Данные успешно обновлены';

                    $text['profile'] = 'Профиль';
                    $text['button'] = 'Сохранить';
                    $text['add_wallet'] = 'Введите номер кошелька';


                } else {

                    $text['h2_text'] = "Partner's personal account";  /*Виджет*/
                    $text['partner_link_text'] = 'Your affiliate link:';  /*Виджет*/
                    $text['update_link_button'] = 'Update';  /*Виджет*/
                    $text['error_link_isset'] = 'This link already exists';  /*Виджет*/
                    $text['success_link_save'] = 'Link saved';  /*Виджет*/

                    // основная форма
                    $text['error_update_form'] = 'Error. Data not updated';
                    $text['success_update_form'] = 'Data successfully updated';

                    $text['profile'] = 'Profile';
                    $text['button'] = 'Save';
                    $text['add_wallet'] = 'Enter the purse number';
                }
                return $text;
                break;
            case 'personal-area-statistic':

                if (Yii::$app->language == 'ru-RU') {


                    $text['h2_text'] = 'Личный кабинет партнера';  /*Виджет*/
                    $text['partner_link_text'] = 'Ваша партнерская ссылка:';  /*Виджет*/
                    $text['update_link_button'] = 'Изменить';  /*Виджет*/
                    $text['error_link_isset'] = 'Такая ссылка уже существует';  /*Виджет*/
                    $text['success_link_save'] = 'Ссылка сохранена';  /*Виджет*/

                    // основная форма
                    $text['error_update_form'] = 'Ошибка. Данные не обновлены';
                    $text['success_update_form'] = 'Данные успешно обновлены';

                    $text['profile'] = 'СТАТИСТИКА';
                    $text['button'] = 'Показать';
                    $text['select_a_period'] = 'Выбрать период';

                    $text['date'] = 'Дата';
                    $text['amount'] = 'Заработанные деньги за выбранный период.';
                    $text['perekhodov_po_ssylke'] = 'Кол-во переходов по ссылке:';
                    $text['oformlennykh_pokupok'] = 'Кол-во оформленных покупок:';
                    $text['oplachennykh_pokupok'] = 'Кол-во оплаченных покупок:';
                    $text['ne_oplachennykh_pokupok'] = 'Кол-во не оплаченных покупок:';
                    $text['povtornykh_pokupok_referalov'] = 'Кол-во повторных покупок рефералов:';
                    $text['unpaid_amount'] = 'Одобренные невыплаченные комиссии.';
                    $text['balance_contains'] = 'БАЛАНС СОДЕРЖИТ';

                } else {

                    $text['h2_text'] = "Partner's personal account";  /*Виджет*/
                    $text['partner_link_text'] = 'Your affiliate link:';  /*Виджет*/
                    $text['update_link_button'] = 'Update';  /*Виджет*/
                    $text['error_link_isset'] = 'This link already exists';  /*Виджет*/
                    $text['success_link_save'] = 'Link saved';  /*Виджет*/

                    // основная форма
                    $text['error_update_form'] = 'Error. Data not updated';
                    $text['success_update_form'] = 'Data successfully updated';

                    $text['profile'] = 'STATISTICS';
                    $text['button'] = 'Show';
                    $text['select_a_period'] = 'Select a period';

                    $text['date'] = 'Date';
                    $text['amount'] = 'Earned money for the selected period.';
                    $text['perekhodov_po_ssylke'] = 'Number of referrals by reference:';
                    $text['oformlennykh_pokupok'] = 'Number of designed purchases:';
                    $text['oplachennykh_pokupok'] = 'Number of paid purchases:';
                    $text['ne_oplachennykh_pokupok'] = 'Number of unpaid purchases:';
                    $text['povtornykh_pokupok_referalov'] = 'Number of repeated purchases of referrals:';
                    $text['unpaid_amount'] = 'Approved unpaid commissions.';
                    $text['balance_contains'] = 'BALANCE CONTAINS';

                }
                return $text;
                break;


            case 'personal-area-balance':

                if (Yii::$app->language == 'ru-RU') {


                    $text['h2_text'] = 'Личный кабинет партнера';  /*Виджет*/
                    $text['partner_link_text'] = 'Ваша партнерская ссылка:';  /*Виджет*/
                    $text['update_link_button'] = 'Изменить';  /*Виджет*/
                    $text['error_link_isset'] = 'Такая ссылка уже существует';  /*Виджет*/
                    $text['success_link_save'] = 'Ссылка сохранена';  /*Виджет*/

                    // основная форма

                    $text['balance'] = 'БАЛАНС';
                    $text['unpaid_amount'] = 'Cумма доступная к выводу.';
                    $text['paiment_contain'] = 'ВЫПЛАТЫ СОДЕРЖАТ';


                } else {

                    $text['h2_text'] = "Partner's personal account";  /*Виджет*/
                    $text['partner_link_text'] = 'Your affiliate link:';  /*Виджет*/
                    $text['update_link_button'] = 'Update';  /*Виджет*/
                    $text['error_link_isset'] = 'This link already exists';  /*Виджет*/
                    $text['success_link_save'] = 'Link saved';  /*Виджет*/

                    // основная форма

                    $text['balance'] = 'BALANCE';
                    $text['unpaid_amount'] = 'Amount available to the conclusion.';
                    $text['paiment_contain'] = 'PAIMENT CONTAIN';

                }
                return $text;
                break;


            case 'personal-area-payments':

                if (Yii::$app->language == 'ru-RU') {

                    /*Виджет*/
                    $text['h2_text'] = 'Личный кабинет партнера';
                    $text['partner_link_text'] = 'Ваша партнерская ссылка:';
                    $text['update_link_button'] = 'Изменить';
                    $text['error_link_isset'] = 'Такая ссылка уже существует';
                    $text['success_link_save'] = 'Ссылка сохранена';
                    $text['success_amount'] = 'Заявка подана успешно';
                    $text['amount_error_not_save'] = 'Ошибка';

                    // основная форма
                    $text['balance'] = 'ВЫПЛАТЫ СОДЕРЖАТ';
                    $text['unpaid_amount'] = 'Одобренные невыплаченные комиссии.';
                    $text['button'] = 'ЗАКАЗАТЬ ВЫПЛАТУ';
                    $text['amount_error'] = 'Сумма для вывода превышает сумму на Вашем счету';
                    $text['modal_h1'] = 'ВЫВОД СРЕДСТВ:';
                    $text['modal_h2'] = 'Ваш счет:';
                    $text['modal_button'] = 'Заказать';
                    $text['not_paid'] = 'Не оплачено';
                    $text['paid'] = 'Оплачено';

                    $text['table_id'] = 'ID';
                    $text['table_date'] = 'Дата:';
                    $text['table_amount'] = 'Сумма операции:';
                    $text['table_status'] = 'Статус:';

                    $text['modal_success'] = 'Спасибо! Ваша заявка уже обрабатывается менеджером и в ближайшее время он с вами свяжется.';
                    $text['modal_error'] = 'Ошибка при выводе средств';


                } else {
                    /*Виджет*/
                    $text['h2_text'] = "Partner's personal account";
                    $text['partner_link_text'] = 'Your affiliate link:';
                    $text['update_link_button'] = 'Update';
                    $text['error_link_isset'] = 'This link already exists';
                    $text['success_link_save'] = 'Link saved';
                    $text['success_amount'] = 'The application was submitted successfully';
                    $text['amount_error_not_save'] = 'Error';

                    // основная форма
                    $text['balance'] = 'PAYMENTS CONTAIN';
                    $text['unpaid_amount'] = 'Approved unpaid commissions.';
                    $text['button'] = 'ORDER PAYMENT';
                    $text['amount_error'] = 'The amount for withdrawal exceeds the amount in your account';
                    $text['modal_h1'] = 'Withdrawal of funds:';
                    $text['modal_h2'] = 'Your account:';
                    $text['modal_button'] = 'To order';
                    $text['not_paid'] = 'Not paid';
                    $text['paid'] = 'Paid';

                    $text['table_id'] = 'ID';
                    $text['table_date'] = 'Date:';
                    $text['table_amount'] = 'Amount of transaction:';
                    $text['table_status'] = 'Status:';

                    $text['modal_success'] = 'Thank you! Your application is already processed by the manager and he will contact you in the near future.';
                    $text['modal_error'] = 'Error issuing funds';
                }

                return $text;
                break;

            case 'personal-area-promotional-materials':

                if (Yii::$app->language == 'ru-RU') {

                    /*Виджет*/
                    $text['h2_text'] = 'Личный кабинет партнера';
                    $text['partner_link_text'] = 'Ваша партнерская ссылка:';
                    $text['update_link_button'] = 'Изменить';
                    $text['error_link_isset'] = 'Такая ссылка уже существует';
                    $text['success_link_save'] = 'Ссылка сохранена';
                    $text['success_amount'] = 'Заявка подана успешно';
                    $text['amount_error_not_save'] = 'Ошибка';

                    // основная форма
                    $text['balance'] = 'ВЫПЛАТЫ СОДЕРЖАТ';
                    $text['unpaid_amount'] = 'Одобренные невыплаченные комиссии.';
                    $text['button'] = 'ЗАКАЗАТЬ ВЫПЛАТУ';
                    $text['amount_error'] = 'Сумма для вывода превышает сумму на Вашем счету';
                    $text['modal_h1'] = 'ВЫВОД СРЕДСТВ:';
                    $text['modal_h2'] = 'Ваш счет:';
                    $text['modal_button'] = 'Заказать';
                    $text['not_paid'] = 'Не оплачено';
                    $text['paid'] = 'Оплачено';

                    $text['table_id'] = 'ID';
                    $text['table_date'] = 'Дата:';
                    $text['table_amount'] = 'Сумма операции:';
                    $text['table_status'] = 'Статус:';

                    $text['modal_success'] = 'Спасибо! Ваша заявка уже обрабатывается менеджером и в ближайшее время он с вами свяжется.';
                    $text['modal_error'] = 'Ошибка при выводе средств';


                } else {
                    /*Виджет*/
                    $text['h2_text'] = "Partner's personal account";
                    $text['partner_link_text'] = 'Your affiliate link:';
                    $text['update_link_button'] = 'Update';
                    $text['error_link_isset'] = 'This link already exists';
                    $text['success_link_save'] = 'Link saved';
                    $text['success_amount'] = 'The application was submitted successfully';
                    $text['amount_error_not_save'] = 'Error';

                    // основная форма
                    $text['balance'] = 'PAYMENTS CONTAIN';
                    $text['unpaid_amount'] = 'Approved unpaid commissions.';
                    $text['button'] = 'ORDER PAYMENT';
                    $text['amount_error'] = 'The amount for withdrawal exceeds the amount in your account';
                    $text['modal_h1'] = 'Withdrawal of funds:';
                    $text['modal_h2'] = 'Your account:';
                    $text['modal_button'] = 'To order';
                    $text['not_paid'] = 'Not paid';
                    $text['paid'] = 'Paid';

                    $text['table_id'] = 'ID';
                    $text['table_date'] = 'Date:';
                    $text['table_amount'] = 'Amount of transaction:';
                    $text['table_status'] = 'Status:';

                    $text['modal_success'] = 'Thank you! Your application is already processed by the manager and he will contact you in the near future.';
                    $text['modal_error'] = 'Error issuing funds';
                }

                return $text;
                break;

            case 'ym':

                if (Yii::$app->language == 'en-EN') {
                    $text['subject'] = 'Your accounts are ready, order number';
                } else {
                    $text['subject'] = 'Ваши аккаунты готовы, номер заказа';
                }
                return $text;
                break;


            case 'new-provider':

                if (Yii::$app->language == 'ru-RU') {

                    $text['registration'] = 'Регистрация';
                    $text['registration_button'] = 'Зарегистрироваться';
                    $text['username'] = 'Логин';
                    $text['email'] = 'Эл. адрес';
                    $text['password'] = 'Пароль';

                    $text['login'] = 'Есть аккаунт? Вход';
                    $text['forgot_password'] = 'Забыли пароль?';


                } else {

                    $text['registration'] = 'Registration';
                    $text['registration_button'] = 'Sign Up';
                    $text['username'] = 'Username';
                    $text['email'] = 'Email';
                    $text['password'] = 'Password';
                    $text['login'] = 'Have an account? Entrance';
                    $text['forgot_password'] = 'Forgot your password?';
                }
                return $text;
                break;


            case 'profile-provider':

                if (Yii::$app->language == 'ru-RU') {


                    $text['h2_text'] = 'Личный кабинет поставщика';  /*Виджет*/
                    $text['partner_link_text'] = 'Ваша партнерская ссылка:';  /*Виджет*/
                    $text['update_link_button'] = 'Изменить';  /*Виджет*/
                    $text['error_link_isset'] = 'Такая ссылка уже существует';  /*Виджет*/
                    $text['success_link_save'] = 'Ссылка сохранена';  /*Виджет*/

                    // основная форма
                    $text['error_update_form'] = 'Ошибка. Данные не обновлены';
                    $text['success_update_form'] = 'Данные успешно обновлены';

                    $text['profile'] = 'Профиль';
                    $text['button'] = 'Сохранить';
                    $text['wallet_number'] = 'Введите номер кошелька';


                } else {

                    $text['h2_text'] = "Vendor's personal account";  /*Виджет*/
                    $text['partner_link_text'] = 'Your affiliate link:';  /*Виджет*/
                    $text['update_link_button'] = 'Update';  /*Виджет*/
                    $text['error_link_isset'] = 'This link already exists';  /*Виджет*/
                    $text['success_link_save'] = 'Link saved';  /*Виджет*/

                    // основная форма
                    $text['error_update_form'] = 'Error. Data not updated';
                    $text['success_update_form'] = 'Data successfully updated';

                    $text['profile'] = 'Profile';
                    $text['button'] = 'Save';
                    $text['wallet_number'] = 'Enter the purse number';
                }
                return $text;
                break;


            case 'affiliate-program-main':

                if (Yii::$app->language == 'ru-RU') {

                    $text['page'] = '<section class="partnership_program">
    <div class="container">
        <div class="title_wrap_h2">
            <h2>Партнерская программа</h2>
        </div>
        <div class="program_list">
            <div class="list_item">
                <div class="list_item_logo"><img src="/img/logo-program.png" style="margin-top: 15%;"></div>
                <div class="list_item_text">
                    <h4>Не нужно ничего продавать!</h4>
                    <p>Просто расскажите о нас на форумах, блогах или в соц сетях. Советуйте знакомым и друзьям наш сервис.</p>
                </div>
            </div>
            <div class="list_item">
                <div class="list_item_logo"><img src="/img/logo-program.png" style="margin-top: 15%;"></div>
                <div class="list_item_text">
                    <h4>Рефералы закрепляются за Вами пожизненно!</h4>
                    <p>Пришедший по Вашей ссылке человек, остается за Вами пожизненно. То есть будет начисляться прибыль каждый раз, когда он будет совершать покупку.</p>
                </div>
            </div>
            <div class="list_item">
                <div class="list_item_logo"><img src="/img/logo-program.png" style="margin-top: 15%;"></div>
                <div class="list_item_text">
                    <h4>11% с каждой покупки при-веденного пользователя!</h4>
                    <p>Начисленные деньги можно вывести на свой счет или потратить на приобретение аккаунтов в нашем магазине.</p>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="program_registration">
    <div class="container">
        <div class="program_form">
            <div class="pr_title">
                <h4>Не откладывайте,</h4>
                <p>начните зарабатывать прямо сейчас:</p>
            </div><a class="btn_a" href="signup-partner">БЫСТРАЯ РЕГИСТРАЦИЯ</a>
            <div class="pr_links">
                <div class="personal-cab"><i class="fa fa-sign-in"></i><a href="login-partner">Личный кабинет</a></div>
                <div class="recovery-pasw"><i class="fa fa-keyboard-o"></i><a href="password-reset-partner">Восстановление пароля</a></div>
            </div>
        </div>
    </div>
</section>
<div class="container">
    <hr>
</div>
<section class="become_our_partner">
    <div class="container">
        <div class="title_wrap_h2">
            <h2>Стань партнером магазина Stockaccs и получай прибыль ежемесячно!</h2>
            <p>Наш сервис предлагает уникальные условия сотрудничества, всем желающим. Теперь Вы сможете зарабатывать сидя дома.</p>
        </div>
        <div class="how_it_works">
            <h4>Как это работает:</h4>
            <ul class="numerical_style">
                <li data-num="1)">Регистрируетесь на нашем сайте.</li>
                <li data-num="2)">Получаете уникальную ссылку, по которой должен будет переходить клиент.</li>
                <li data-num="3)">Предоставляете ссылку, заинтересованному человеку.</li>
                <li data-num="4)">Он переходит и выбирает необходимые аккаунты.</li>
                <li data-num="5)">Совершает покупку, на любую сумму.</li>
                <li data-num="6)">Вы получаете 11% от суммы покупки.</li>
            </ul>
            <h4>Где можно разместить ссылку, чтоб перешло больше людей:</h4>
            <ul>
                <li>В комментариях на Youtube, Вконтакте, Одноклассниках и других соц сетях.</li>
                <li>В подписи своего профиля на форумах.</li>
                <li>Создать свою тему на форуме или прокомментировав существующую.</li>
                <li>Отправить личным сообщением друзьям в соц сетях.</li>
                <li>Поделиться ссылкой в тематических группах, сообществах.</li>
            </ul>
            <p>Как видите, предельно просто, получать дополнительный доход, не прикладывая особых усилий. У нас нет ограничений на количество приведенных пользователей – больше приведете, больше получите.</p>
        </div>
        <div class="forbbiden"><span>Запрещено:</span>
            <p><span>Использовать спам:</span>рассылки и прочее, с целью распространения своей партнерской ссылки.</p>
        </div>
    </div>
</section>';


                } else {

                    $text['page'] = '<section class="partnership_program">
    <div class="container">
        <div class="title_wrap_h2">
            <h2>Affiliate program</h2>
        </div>
        <div class="program_list">
            <div class="list_item">
                <div class="list_item_logo"><img src="/img/logo-program.png" style="margin-top: 15%;"></div>
                <div class="list_item_text">
                    <h4>You don’t need to sell something!</h4>
                    <p>Just share the information about us on forums, blogs or in social networks. Recommend to your contacts and friends about our service.</p>
                </div>
            </div>
            <div class="list_item">
                <div class="list_item_logo"><img src="/img/logo-program.png" style="margin-top: 15%;"></div>
                <div class="list_item_text">
                    <h4>Referrals are assigned to you for all the time!</h4>
                    <p>The person who came by your reference, becomes your referral for all the time. That is, profits will be accrued each time your referral makes a purchase.</p>
                </div>
            </div>
            <div class="list_item">
                <div class="list_item_logo"><img src="/img/logo-program.png" style="margin-top: 15%;"></div>
                <div class="list_item_text">
                    <h4>11% from every purchase of the user!</h4>
                    <p>Accrued money can be withdrawn to your account or be spent on purchasing accounts in our store.</p>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="program_registration">
    <div class="container">
        <div class="program_form">
            <div class="pr_title">
                <h4>Do not wait,</h4>
                <p>start your earnings right now:</p>
            </div><a class="btn_a" href="signup-partner">QUICK REGISTRATION</a>
            <div class="pr_links">
                <div class="personal-cab"><i class="fa fa-sign-in"></i><a href="login-partner">Personal control panel</a></div>
                <div class="recovery-pasw"><i class="fa fa-keyboard-o"></i><a href="password-reset-partner">Reset your password</a></div>
            </div>
        </div>
    </div>
</section>
<div class="container">
    <hr>
</div>
<section class="become_our_partner">
    <div class="container">
        <div class="title_wrap_h2">
            <h2>Become a partner of the Stockaccs store and make a profit every month!</h2>
            <p>Our service offers unique conditions of cooperation to all customers. Now you can earn sitting at home.</p>
        </div>
        <div class="how_it_works">
            <h4>How it works:</h4>
            <ul class="numerical_style">
                <li data-num="1)">Register on our website.</li>
                <li data-num="2)">You will get a unique link, according to which the client should be transferred.</li>
                <li data-num="3)">Provide the link to person that concerned.</li>
                <li data-num="4)">User goes and selects the required accounts.</li>
                <li data-num="5)">User makes a purchase, for any amount.</li>
                <li data-num="6)">You will get 11% of the every purchase amount</li>
            </ul>
            <h4>Where can you share the link to find and get more referrals:</h4>
            <ul>
                <li>In the comments on Youtube, Vkontakte, Odnoklassniki and other social networks.</li>
                <li>In description of your profile on the forums.</li>
                <li>Create your own topic on the forum or comment in the existing one.</li>
                <li>Send a personal message to friends in social networks.</li>
                <li>Share links in thematic groups or communities.</li>
            </ul>
            <p>As you can see, it is simple enough, to receive additional income without exerting special efforts. We do not have restrictions on the number of referred users – you will bring more - you will receive more.</p>
        </div>
        <div class="forbbiden"><span>Forbidden:</span>
            <p><span>Spamming:</span>e-mail spam and so on, in order to promote your affiliate link.</p>
        </div>
    </div>
</section>';


                }
                return $text;
                break;

        }


    }


    public function actionPersonalProvider()
    {
        $text = [];

        if (Yii::$app->language == 'ru-RU') {
            $text['suggest'] = 'Предложить свои аккаунты';
        } else {
            $text['suggest'] = 'Suggest my accounts';
        }

    }
}