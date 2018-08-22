-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 22 2018 г., 09:33
-- Версия сервера: 5.6.38
-- Версия PHP: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `happyp03_cto`
--

-- --------------------------------------------------------

--
-- Структура таблицы `lang`
--

CREATE TABLE `lang` (
  `id` int(11) NOT NULL,
  `url` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `local` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `default` smallint(6) NOT NULL DEFAULT '0',
  `date_update` int(11) NOT NULL,
  `date_create` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Дамп данных таблицы `lang`
--

INSERT INTO `lang` (`id`, `url`, `local`, `name`, `default`, `date_update`, `date_create`) VALUES
(1, 'en', 'en-EN', 'English', 0, 1474534054, 1474534054),
(2, 'ru', 'ru-RU', 'Русский', 1, 1474534054, 1474534054);

-- --------------------------------------------------------

--
-- Структура таблицы `seo_page`
--

CREATE TABLE `seo_page` (
  `id` int(11) NOT NULL,
  `page_name` varchar(100) NOT NULL,
  `seo_title_ru` varchar(255) NOT NULL,
  `seo_description_ru` text NOT NULL,
  `seo_keywords_ru` varchar(255) NOT NULL,
  `seo_image_alt_ru` varchar(255) NOT NULL,
  `seo_image_title_ru` varchar(255) NOT NULL,
  `description_ru` text NOT NULL,
  `h1_ru` text NOT NULL,
  `seo_title_en` varchar(255) NOT NULL,
  `seo_description_en` text NOT NULL,
  `seo_keywords_en` varchar(255) NOT NULL,
  `seo_image_alt_en` varchar(255) NOT NULL,
  `seo_image_title_en` varchar(255) NOT NULL,
  `description_en` text NOT NULL,
  `h1_en` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `seo_page`
--

INSERT INTO `seo_page` (`id`, `page_name`, `seo_title_ru`, `seo_description_ru`, `seo_keywords_ru`, `seo_image_alt_ru`, `seo_image_title_ru`, `description_ru`, `h1_ru`, `seo_title_en`, `seo_description_en`, `seo_keywords_en`, `seo_image_alt_en`, `seo_image_title_en`, `description_en`, `h1_en`) VALUES
(1, 'index', 'Test', 'Seo Description Ru', 'Seo Keywords Ru', 'Seo Image Alt Ru', 'Seo Image Title Ru', '<h2>Добро пожаловать в магазин качественных аккаунтов Stockaccs!</h2>\r\n<p>У нас вы купите необходимое колличество аккаунтов для ваших задач. Купить аккаунты на stockaccs.com вы можете воспользовавшись любым удобным видом оплаты. Мы принимаем к оплате все возможные электронные платежные системы, криптовалюты и карты. Купленные аккаунты Вы получаете на почту сразу же после оплаты.\r\n</p>\r\n<p>Все наши аккауны регестрируются с помощью нашего специального ПО разработаного нашими специалистами, на персональных прокси. Мы постоянно следим за качеством аккаунтов, проверяем на ограничения и баны, при малейших сомнения в валидности аккаунты уходят в отлежку и через время снова проверяются.\r\n</p>\r\n<p>В последнее время все более восстребоваными становятся аккаунты для социальных сетей. И это не удивительно, так как соц. сети отличное место для заработка на накрутках, рассылках или просто спаме по личкам, коментариям, стенам. Мы предлогаем аккаунты во всех популярных социальных сетях: Вконтакте, Инстаграм, Одноклассники, Твиттер, Гугл плюс.\r\n</p>\r\n<p>Так же на Stockaccs вы найдете аккаунты для большинства почтовых ящиков, самые популярные из них Gmail.com, Mail.ru, Meta.ua, Yahoo, hotmail они отлично подходят для всех видов регистраций и рассылок сообщений.\r\n</p>', '   не большой текст для главной, заполняется из админки', 'Seo Title En', 'Seo Description En', 'Seo Keywords En', 'Seo Image Alt En', 'Seo Image Title En', '<h4>ENGLISH  Добро пожаловать в магазин качественных аккаунтов Stockaccs!</h4><p>У нас вы купите необходимое колличество аккаунтов для ваших задач. Купить аккаунты на stockaccs.com вы можете воспользовавшись любым удобным видом оплаты. Мы принимаем к оплате все возможные электронные платежные системы, криптовалюты и карты. Купленные аккаунты Вы получаете на почту сразу же после оплаты.</p><p>Все наши аккауны регестрируются с помощью нашего специального ПО разработаного нашими специалистами, на персональных прокси. Мы постоянно следим за качеством аккаунтов, проверяем на ограничения и баны, при малейших сомнения в валидности аккаунты уходят в отлежку и через время снова проверяются.</p><p>В последнее время все более восстребоваными становятся аккаунты для социальных сетей. И это не удивительно, так как соц. сети отличное место для заработка на накрутках, рассылках или просто спаме по личкам, коментариям, стенам. Мы предлогаем аккаунты во всех популярных социальных сетях: Вконтакте, Инстаграм, Одноклассники, Твиттер, Гугл плюс.</p><p>Так же на Stockaccs вы найдете аккаунты для большинства почтовых ящиков, самые популярные из них Gmail.com, Mail.ru, Meta.ua, Yahoo, hotmail они отлично подходят для всех видов регистраций и рассылок сообщений.</p>', ' <h1>Account Store&#160<span>Stockaccs</span></h1>\r\n'),
(60, 'faq', 'Часто задаваемые вопросы', 'Часто задаваемые вопросы', '', '', '', '<p>Тест с водой от контекстщика или СЕОшника<br></p>', 'Часто задаваемые вопросы, заполняется в админке', '', '', '', '', '', '', ''),
(61, 'feedbacks', 'отзывы о НАС', 'отзывы о НАС', 'отзывы о НАС', 'отзывы о НАС', 'отзывы о НАС', 'отзывы о НАС   текст для воды или правила для написания отзыва. Типа нельзя писать маты и т.д.', 'отзывы о НАС', '', '', '', '', '', '', ''),
(62, 'our-works', 'Наши работы', 'Наши работы  текст, из админки', 'Наши работы', 'Наши работы', 'Наши работы', 'Наши работы  текст, из админки', 'Наши работы', '', '', '', '', '', '', ''),
(63, 'painting', 'Покраска', 'Покраска', 'Покраска', 'Покраска', 'Покраска', 'Покраска', 'Покраска', '', '', '', '', '', '', ''),
(64, 'polishing', 'Полировка', 'Полировка', 'Полировка', 'Полировка', 'Полировка', 'Полировка', 'Полировка', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `year` date NOT NULL,
  `photo` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`id`, `first_name`, `last_name`, `year`, `photo`, `user_id`) VALUES
(1, 'Имя', 'Фамилия', '2018-08-08', 'steam-160x60.png', 1),
(3, 'Алексей', 'Третьяков', '1989-12-29', 'photo.jpg', 123);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `username` varchar(55) NOT NULL,
  `auth_key` varchar(32) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_reset_token` text NOT NULL,
  `skype_icq` varchar(100) NOT NULL,
  `reliable_person` int(11) NOT NULL COMMENT 'Надежность партнера / продавца',
  `created_at` varchar(50) NOT NULL,
  `updated_at` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `status`, `role`, `username`, `auth_key`, `password_hash`, `email`, `password_reset_token`, `skype_icq`, `reliable_person`, `created_at`, `updated_at`) VALUES
(1, 10, 20, 'admin', '2592000', '$2y$13$kOeduRFrsiom0K2KrGnvsu4.hJIrcyKAi73ZyT6skOKbwxp7NvOwu', '', '', '', 0, '', '1508330351'),
(5, 10, 20, 'xtz', '2592000', '$2y$13$vVn76gxBGpxJA6Px/2HSeuMtnoP3TUEc9kZS1LGBH1kiKVU..fy02', 'xtz', '', '', 0, '', '1505392262');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `lang`
--
ALTER TABLE `lang`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `seo_page`
--
ALTER TABLE `seo_page`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `lang`
--
ALTER TABLE `lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `seo_page`
--
ALTER TABLE `seo_page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
