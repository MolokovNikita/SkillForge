
## Root уровень

### root_admins

Супер-администраторы системы с полным доступом ко всем компаниям и настройкам.[^3]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор супер-админа |
| email | VARCHAR(255) UNIQUE NOT NULL | Email для входа в систему |
| password_hash | VARCHAR(255) NOT NULL | Хеш пароля для безопасного хранения |
| full_name | VARCHAR(255) NOT NULL | Полное имя администратора |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания аккаунта |
| last_login | TIMESTAMP | Последний вход в систему |

### subscription_plans

Тарифные планы для компаний с ограничениями по количеству сотрудников, курсов и хранилища.[^4][^5]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор тарифа |
| name | VARCHAR(100) NOT NULL | Название тарифного плана |
| max_employees | INTEGER | Максимальное количество сотрудников |
| max_courses | INTEGER | Максимальное количество курсов |
| max_storage_gb | INTEGER | Лимит хранилища в гигабайтах |
| price_per_month | DECIMAL(10, 2) | Стоимость в месяц |
| features | JSONB | Дополнительные возможности в JSON формате |
| is_active | BOOLEAN DEFAULT true | Активность тарифа |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания тарифа |

## Уровень компании

### companies

Аккаунты компаний (тенанты) - основные клиенты системы со своими поддоменами и подписками.[^5][^3][^4]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор компании |
| name | VARCHAR(255) NOT NULL | Название компании |
| subdomain | VARCHAR(100) UNIQUE NOT NULL | Поддомен для доступа (company.lms.ru) |
| logo_url | VARCHAR(500) | Ссылка на логотип компании |
| subscription_plan_id | INTEGER REFERENCES subscription_plans(id) | Связь с тарифным планом |
| subscription_status | VARCHAR(50) DEFAULT 'active' | Статус подписки (active, suspended, cancelled) |
| subscription_start_date | DATE NOT NULL | Дата начала подписки |
| subscription_end_date | DATE | Дата окончания подписки |
| max_employees | INTEGER | Текущий лимит сотрудников |
| contact_email | VARCHAR(255) NOT NULL | Контактный email |
| contact_phone | VARCHAR(50) | Контактный телефон |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата регистрации компании |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата последнего обновления |
| settings | JSONB | Настройки компании (брендинг, уведомления) |

### company_admins

Администраторы компаний с правами управления сотрудниками, курсами и контентом.[^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор администратора |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| email | VARCHAR(255) NOT NULL | Email для входа |
| password_hash | VARCHAR(255) NOT NULL | Хеш пароля |
| full_name | VARCHAR(255) NOT NULL | Полное имя администратора |
| role | VARCHAR(50) DEFAULT 'admin' | Роль (admin, owner, manager) |
| permissions | JSONB | Детализированные права доступа |
| is_active | BOOLEAN DEFAULT true | Активность аккаунта |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |
| last_login | TIMESTAMP | Последний вход |

## Сотрудники

### employees

Сотрудники компаний - конечные пользователи, проходящие обучение и тестирование.[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор сотрудника |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| email | VARCHAR(255) NOT NULL | Email для входа |
| password_hash | VARCHAR(255) NOT NULL | Хеш пароля |
| full_name | VARCHAR(255) NOT NULL | Полное имя сотрудника |
| position | VARCHAR(255) | Должность |
| department_id | INTEGER | Связь с отделом |
| avatar_url | VARCHAR(500) | Ссылка на аватар |
| hire_date | DATE | Дата приема на работу |
| is_active | BOOLEAN DEFAULT true | Активность аккаунта |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания аккаунта |
| last_login | TIMESTAMP | Последний вход |

### departments

Отделы компании для организационной структуры с поддержкой иерархии.[^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор отдела |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| name | VARCHAR(255) NOT NULL | Название отдела |
| parent_department_id | INTEGER REFERENCES departments(id) | Родительский отдел для иерархии |
| manager_id | INTEGER REFERENCES employees(id) | Руководитель отдела |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

## Образовательный контент

### courses

Курсы обучения с описанием, уровнем сложности и статусом публикации.[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор курса |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| title | VARCHAR(500) NOT NULL | Название курса |
| description | TEXT | Подробное описание |
| cover_image_url | VARCHAR(500) | Обложка курса |
| category_id | INTEGER | Связь с категорией |
| difficulty_level | VARCHAR(50) | Уровень сложности (beginner, intermediate, advanced) |
| estimated_hours | DECIMAL(5, 2) | Примерная длительность в часах |
| is_published | BOOLEAN DEFAULT false | Опубликован ли курс |
| is_mandatory | BOOLEAN DEFAULT false | Обязательный курс для прохождения |
| created_by | INTEGER REFERENCES company_admins(id) | Автор курса |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата обновления |

### course_categories

Категории курсов для структурирования контента с поддержкой вложенности.[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор категории |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| name | VARCHAR(255) NOT NULL | Название категории |
| parent_category_id | INTEGER REFERENCES course_categories(id) | Родительская категория |

### course_modules

Модули курса - логические разделы, объединяющие связанные уроки.[^1][^2]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор модуля |
| course_id | INTEGER NOT NULL REFERENCES courses(id) | Связь с курсом |
| title | VARCHAR(500) NOT NULL | Название модуля |
| description | TEXT | Описание модуля |
| order_index | INTEGER NOT NULL | Порядок отображения |
| is_published | BOOLEAN DEFAULT false | Статус публикации |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

### lessons

Уроки/лекции с различными типами контента (видео, текст, презентации, SCORM).[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор урока |
| module_id | INTEGER NOT NULL REFERENCES course_modules(id) | Связь с модулем |
| title | VARCHAR(500) NOT NULL | Название урока |
| content_type | VARCHAR(50) NOT NULL | Тип контента (video, text, presentation, scorm) |
| content_url | VARCHAR(1000) | Ссылка на контент |
| content_text | TEXT | Текстовое содержимое |
| duration_minutes | INTEGER | Длительность в минутах |
| order_index | INTEGER NOT NULL | Порядок отображения |
| is_published | BOOLEAN DEFAULT false | Статус публикации |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

### lesson_materials

Дополнительные материалы к урокам (документы, файлы для скачивания).[^1][^2]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор материала |
| lesson_id | INTEGER NOT NULL REFERENCES lessons(id) | Связь с уроком |
| title | VARCHAR(255) NOT NULL | Название материала |
| file_url | VARCHAR(1000) NOT NULL | Ссылка на файл |
| file_type | VARCHAR(50) | Тип файла (pdf, docx, xlsx и т.д.) |
| file_size_kb | INTEGER | Размер файла в килобайтах |
| uploaded_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата загрузки |

## Тестирование

### tests

Тесты для оценки знаний с настройками времени, проходного балла и количества попыток.[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор теста |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| course_id | INTEGER REFERENCES courses(id) | Связь с курсом (опционально) |
| module_id | INTEGER REFERENCES course_modules(id) | Связь с модулем (опционально) |
| title | VARCHAR(500) NOT NULL | Название теста |
| description | TEXT | Описание и инструкции |
| time_limit_minutes | INTEGER | Ограничение времени в минутах |
| passing_score_percent | INTEGER DEFAULT 70 | Проходной балл в процентах |
| max_attempts | INTEGER | Максимальное количество попыток |
| shuffle_questions | BOOLEAN DEFAULT false | Перемешивать вопросы |
| show_correct_answers | BOOLEAN DEFAULT true | Показывать правильные ответы после теста |
| is_published | BOOLEAN DEFAULT false | Статус публикации |
| created_by | INTEGER REFERENCES company_admins(id) | Автор теста |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

### test_questions

Вопросы тестов с различными типами (одиночный/множественный выбор, текст, да/нет).[^1][^2]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор вопроса |
| test_id | INTEGER NOT NULL REFERENCES tests(id) | Связь с тестом |
| question_type | VARCHAR(50) NOT NULL | Тип вопроса (single_choice, multiple_choice, text, true_false) |
| question_text | TEXT NOT NULL | Текст вопроса |
| points | DECIMAL(5, 2) DEFAULT 1.0 | Количество баллов за правильный ответ |
| order_index | INTEGER NOT NULL | Порядок отображения |
| explanation | TEXT | Объяснение правильного ответа |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

### question_options

Варианты ответов на вопросы с пометкой правильных ответов.[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор варианта |
| question_id | INTEGER NOT NULL REFERENCES test_questions(id) | Связь с вопросом |
| option_text | TEXT NOT NULL | Текст варианта ответа |
| is_correct | BOOLEAN DEFAULT false | Является ли правильным ответом |
| order_index | INTEGER NOT NULL | Порядок отображения |

## Назначения и прогресс

### course_enrollments

Назначение курсов сотрудникам с отслеживанием статуса и процента выполнения.[^1][^2]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор записи |
| course_id | INTEGER NOT NULL REFERENCES courses(id) | Связь с курсом |
| employee_id | INTEGER NOT NULL REFERENCES employees(id) | Связь с сотрудником |
| assigned_by | INTEGER REFERENCES company_admins(id) | Кто назначил курс |
| assigned_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата назначения |
| deadline | DATE | Срок выполнения |
| status | VARCHAR(50) DEFAULT 'not_started' | Статус (not_started, in_progress, completed, overdue) |
| started_at | TIMESTAMP | Дата начала прохождения |
| completed_at | TIMESTAMP | Дата завершения |
| completion_percent | DECIMAL(5, 2) DEFAULT 0 | Процент выполнения курса |

### lesson_progress

Детальный прогресс по каждому уроку с учетом времени просмотра.[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор записи |
| enrollment_id | INTEGER NOT NULL REFERENCES course_enrollments(id) | Связь с назначением курса |
| lesson_id | INTEGER NOT NULL REFERENCES lessons(id) | Связь с уроком |
| status | VARCHAR(50) DEFAULT 'not_started' | Статус (not_started, in_progress, completed) |
| time_spent_minutes | INTEGER DEFAULT 0 | Время, потраченное на урок |
| started_at | TIMESTAMP | Дата начала просмотра |
| completed_at | TIMESTAMP | Дата завершения |

### test_attempts

Попытки прохождения тестов с результатами, баллами и временем выполнения.[^1][^2]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор попытки |
| test_id | INTEGER NOT NULL REFERENCES tests(id) | Связь с тестом |
| employee_id | INTEGER NOT NULL REFERENCES employees(id) | Связь с сотрудником |
| attempt_number | INTEGER NOT NULL | Номер попытки |
| started_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата начала теста |
| submitted_at | TIMESTAMP | Дата отправки теста |
| score_percent | DECIMAL(5, 2) | Результат в процентах |
| total_points | DECIMAL(8, 2) | Максимальное количество баллов |
| earned_points | DECIMAL(8, 2) | Набранные баллы |
| is_passed | BOOLEAN | Пройден ли тест |
| time_spent_minutes | INTEGER | Время прохождения в минутах |

### test_answers

Ответы сотрудников на вопросы тестов с проверкой правильности.[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор ответа |
| attempt_id | INTEGER NOT NULL REFERENCES test_attempts(id) | Связь с попыткой теста |
| question_id | INTEGER NOT NULL REFERENCES test_questions(id) | Связь с вопросом |
| selected_option_ids | INTEGER[] | Массив выбранных вариантов для multiple_choice |
| text_answer | TEXT | Текстовый ответ для открытых вопросов |
| is_correct | BOOLEAN | Правильность ответа |
| points_earned | DECIMAL(5, 2) | Заработанные баллы |
| answered_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Время ответа |

## Сертификаты

### certificates

Сертификаты об окончании курсов с уникальными номерами и сроками действия.[^1][^2]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор сертификата |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| employee_id | INTEGER NOT NULL REFERENCES employees(id) | Связь с сотрудником |
| course_id | INTEGER NOT NULL REFERENCES courses(id) | Связь с курсом |
| certificate_number | VARCHAR(100) UNIQUE NOT NULL | Уникальный номер сертификата |
| issue_date | DATE NOT NULL | Дата выдачи |
| expiry_date | DATE | Дата истечения (для сертификатов с ограниченным сроком) |
| certificate_url | VARCHAR(1000) | Ссылка на PDF файл сертификата |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

## Аналитика

### company_statistics

Ежедневная статистика по компаниям для анализа активности и использования ресурсов.[^3][^4]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор записи |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| stat_date | DATE NOT NULL | Дата статистики |
| total_employees | INTEGER DEFAULT 0 | Всего сотрудников |
| active_employees | INTEGER DEFAULT 0 | Активных сотрудников |
| total_courses | INTEGER DEFAULT 0 | Всего курсов |
| published_courses | INTEGER DEFAULT 0 | Опубликованных курсов |
| total_tests | INTEGER DEFAULT 0 | Всего тестов |
| total_enrollments | INTEGER DEFAULT 0 | Всего назначений курсов |
| completed_courses | INTEGER DEFAULT 0 | Завершенных курсов |
| storage_used_gb | DECIMAL(10, 2) DEFAULT 0 | Использовано хранилища в ГБ |

### notifications

Уведомления для администраторов и сотрудников о событиях системы.[^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор уведомления |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| recipient_type | VARCHAR(50) NOT NULL | Тип получателя (admin, employee) |
| recipient_id | INTEGER NOT NULL | ID получателя |
| notification_type | VARCHAR(100) NOT NULL | Тип уведомления (course_assigned, test_deadline, certificate_issued) |
| title | VARCHAR(500) NOT NULL | Заголовок уведомления |
| message | TEXT | Текст уведомления |
| is_read | BOOLEAN DEFAULT false | Прочитано ли уведомление |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

## Дополнительные функции

### employee_groups

Группы сотрудников для массового назначения курсов и управления доступом.[^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор группы |
| company_id | INTEGER NOT NULL REFERENCES companies(id) | Связь с компанией |
| name | VARCHAR(255) NOT NULL | Название группы |
| description | TEXT | Описание группы |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

### employee_group_members

Связь между группами и сотрудниками (many-to-many).[^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| group_id | INTEGER NOT NULL REFERENCES employee_groups(id) | Связь с группой |
| employee_id | INTEGER NOT NULL REFERENCES employees(id) | Связь с сотрудником |
| added_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата добавления в группу |

### course_reviews

Отзывы и оценки курсов от сотрудников для улучшения качества контента.[^2][^1]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор отзыва |
| course_id | INTEGER NOT NULL REFERENCES courses(id) | Связь с курсом |
| employee_id | INTEGER NOT NULL REFERENCES employees(id) | Связь с сотрудником |
| rating | INTEGER CHECK (rating >= 1 AND rating <= 5) | Оценка от 1 до 5 |
| review_text | TEXT | Текст отзыва |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата создания |

### audit_logs

Журнал аудита всех действий пользователей для безопасности и отчетности.[^6][^7]


| Поле | Тип | Описание |
| :-- | :-- | :-- |
| id | SERIAL PRIMARY KEY | Уникальный идентификатор записи |
| company_id | INTEGER REFERENCES companies(id) | Связь с компанией (NULL для root действий) |
| user_type | VARCHAR(50) NOT NULL | Тип пользователя (root_admin, company_admin, employee) |
| user_id | INTEGER NOT NULL | ID пользователя |
| action | VARCHAR(100) NOT NOT | Выполненное действие (create, update, delete, login) |
| entity_type | VARCHAR(100) | Тип сущности (course, test, employee) |
| entity_id | INTEGER | ID сущности |
| details | JSONB | Детали действия в JSON формате |
| ip_address | INET | IP адрес пользователя |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Дата и время действия |
