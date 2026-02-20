# Food E-Commerce Platform

A modern full-stack e-commerce platform for food ordering, built with Django REST Framework backend and React frontend.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication system with admin panel
- **Product Management**: Browse food items organized by categories
- **Search Functionality**: Search products by name
- **Product Sorting**: Sort products by various criteria
- **Shopping Cart**: Add items to cart and manage quantities
- **Order Management**: Place and track orders
- **Admin Panel**: Full Django admin interface for managing products, categories, and orders
- **Asynchronous Tasks**: Celery integration for background task processing
- **RESTful API**: Well-structured API endpoints with OpenAPI documentation

## 🛠️ Tech Stack

### Backend
- **Django 5.0.4**: Web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Database
- **Celery**: Asynchronous task queue
- **RabbitMQ**: Message broker
- **Gunicorn**: WSGI HTTP server
- **Nginx**: Reverse proxy and web server
- **JWT Authentication**: Secure token-based authentication

### Frontend
- **React**: UI library
- **Tailwind CSS**: Styling

## 📋 Prerequisites

- Docker and Docker Compose
- Git

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foodd
   ```

2. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

3. **Start all services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:80
   - Admin Panel: http://localhost:80/admin

### Manual Setup

#### Backend Setup

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure database**
   - Update `foodd/settings.py` with your PostgreSQL credentials
   - Or use the default Docker PostgreSQL settings

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 🐳 Docker Services

The `docker-compose.yml` includes the following services:

- **app**: Django application server
- **postgres**: PostgreSQL database
- **rabbitmq**: RabbitMQ message broker
- **celery_worker**: Celery worker for background tasks
- **nginx**: Nginx reverse proxy
- **react**: React development server

## 📁 Project Structure

```
foodd/
├── Backend/
│   ├── account/          # User authentication app
│   ├── cart/            # Shopping cart and orders app
│   ├── home/             # Products and categories app
│   ├── foodd/            # Django project settings
│   ├── dockerfile        # Backend Docker configuration
│   ├── docker-compose.yml # Docker Compose configuration
│   └── requirements.txt  # Python dependencies
└── Frontend/
    ├── src/              # React source code
    ├── public/           # Static files
    └── dockerfile        # Frontend Docker configuration
```

## 🔧 Configuration

### Environment Variables

For production, configure the following environment variables:

- `POSTGRES_DB`: Database name
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_HOST`: Database host
- `POSTGRES_PORT`: Database port
- `SECRET_KEY`: Django secret key
- `DEBUG`: Debug mode (set to False in production)

### Database Configuration

Update `Backend/foodd/settings.py` to configure database connection:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'foodd_db',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'postgres',  # Use 'localhost' for local development
        'PORT': '5432',
    }
}
```

## 📚 API Documentation

API documentation is available via DRF Spectacular. Once the server is running, access:

- Swagger UI: http://localhost:80/api/schema/swagger-ui/
- ReDoc: http://localhost:80/api/schema/redoc/

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## 🧪 Running Tests

```bash
cd Backend
python manage.py test
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

# پلتفرم فروشگاه آنلاین غذا

یک پلتفرم تجارت الکترونیک مدرن برای سفارش غذا که با Django REST Framework در بک‌اند و React در فرانت‌اند ساخته شده است.

## 🚀 ویژگی‌ها

- **احراز هویت و مجوزدهی کاربر**: سیستم احراز هویت مبتنی بر JWT با پنل ادمین
- **مدیریت محصولات**: مرور آیتم‌های غذایی سازمان‌دهی شده بر اساس دسته‌بندی
- **قابلیت جستجو**: جستجوی محصولات بر اساس نام
- **مرتب‌سازی محصولات**: مرتب‌سازی محصولات بر اساس معیارهای مختلف
- **سبد خرید**: افزودن آیتم‌ها به سبد خرید و مدیریت تعداد
- **مدیریت سفارشات**: ثبت و پیگیری سفارشات
- **پنل ادمین**: رابط کامل ادمین Django برای مدیریت محصولات، دسته‌بندی‌ها و سفارشات
- **وظایف ناهمزمان**: یکپارچه‌سازی Celery برای پردازش وظایف پس‌زمینه
- **API RESTful**: نقاط پایانی API با ساختار مناسب و مستندات OpenAPI

## 🛠️ فناوری‌های استفاده شده

### بک‌اند
- **Django 5.0.4**: فریمورک وب
- **Django REST Framework**: توسعه API
- **PostgreSQL**: پایگاه داده
- **Celery**: صف وظایف ناهمزمان
- **RabbitMQ**: کارگزار پیام
- **Gunicorn**: سرور HTTP WSGI
- **Nginx**: پروکسی معکوس و سرور وب
- **احراز هویت JWT**: احراز هویت امن مبتنی بر توکن

### فرانت‌اند
- **React**: کتابخانه رابط کاربری
- **Tailwind CSS**: استایل‌دهی

## 📋 پیش‌نیازها

- Docker و Docker Compose
- Git

## 🚀 شروع سریع

### استفاده از Docker (توصیه می‌شود)

1. **کلون کردن مخزن**
   ```bash
   git clone <repository-url>
   cd foodd
   ```

2. **رفتن به پوشه Backend**
   ```bash
   cd Backend
   ```

3. **اجرای تمام سرویس‌ها با Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **دسترسی به برنامه**
   - فرانت‌اند: http://localhost:3000
   - API بک‌اند: http://localhost:80
   - پنل ادمین: http://localhost:80/admin

### راه‌اندازی دستی

#### راه‌اندازی بک‌اند

1. **رفتن به پوشه Backend**
   ```bash
   cd Backend
   ```

2. **ایجاد محیط مجازی**
   ```bash
   python -m venv venv
   source venv/bin/activate  # در ویندوز: venv\Scripts\activate
   ```

3. **نصب وابستگی‌ها**
   ```bash
   pip install -r requirements.txt
   ```

4. **پیکربندی پایگاه داده**
   - فایل `foodd/settings.py` را با اطلاعات PostgreSQL خود به‌روزرسانی کنید
   - یا از تنظیمات پیش‌فرض PostgreSQL Docker استفاده کنید

5. **اجرای مایگریشن‌ها**
   ```bash
   python manage.py migrate
   ```

6. **ایجاد کاربر ادمین**
   ```bash
   python manage.py createsuperuser
   ```

7. **اجرای سرور توسعه**
   ```bash
   python manage.py runserver
   ```

#### راه‌اندازی فرانت‌اند

1. **رفتن به پوشه Frontend**
   ```bash
   cd Frontend
   ```

2. **نصب وابستگی‌ها**
   ```bash
   npm install
   ```

3. **اجرای سرور توسعه**
   ```bash
   npm start
   ```

## 🐳 سرویس‌های Docker

فایل `docker-compose.yml` شامل سرویس‌های زیر است:

- **app**: سرور برنامه Django
- **postgres**: پایگاه داده PostgreSQL
- **rabbitmq**: کارگزار پیام RabbitMQ
- **celery_worker**: کارگر Celery برای وظایف پس‌زمینه
- **nginx**: پروکسی معکوس Nginx
- **react**: سرور توسعه React

## 📁 ساختار پروژه

```
foodd/
├── Backend/
│   ├── account/          # اپلیکیشن احراز هویت کاربر
│   ├── cart/            # اپلیکیشن سبد خرید و سفارشات
│   ├── home/             # اپلیکیشن محصولات و دسته‌بندی‌ها
│   ├── foodd/            # تنظیمات پروژه Django
│   ├── dockerfile        # پیکربندی Docker بک‌اند
│   ├── docker-compose.yml # پیکربندی Docker Compose
│   └── requirements.txt  # وابستگی‌های Python
└── Frontend/
    ├── src/              # کد منبع React
    ├── public/           # فایل‌های استاتیک
    └── dockerfile        # پیکربندی Docker فرانت‌اند
```

## 🔧 پیکربندی

### متغیرهای محیطی

برای تولید، متغیرهای محیطی زیر را پیکربندی کنید:

- `POSTGRES_DB`: نام پایگاه داده
- `POSTGRES_USER`: کاربر پایگاه داده
- `POSTGRES_PASSWORD`: رمز عبور پایگاه داده
- `POSTGRES_HOST`: میزبان پایگاه داده
- `POSTGRES_PORT`: پورت پایگاه داده
- `SECRET_KEY`: کلید مخفی Django
- `DEBUG`: حالت دیباگ (در تولید روی False تنظیم کنید)

### پیکربندی پایگاه داده

فایل `Backend/foodd/settings.py` را برای پیکربندی اتصال پایگاه داده به‌روزرسانی کنید:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'foodd_db',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'postgres',  # برای توسعه محلی از 'localhost' استفاده کنید
        'PORT': '5432',
    }
}
```

## 📚 مستندات API

مستندات API از طریق DRF Spectacular در دسترس است. پس از اجرای سرور، به آدرس‌های زیر دسترسی داشته باشید:

- Swagger UI: http://localhost:80/api/schema/swagger-ui/
- ReDoc: http://localhost:80/api/schema/redoc/

## 🔐 احراز هویت

API از JWT (JSON Web Tokens) برای احراز هویت استفاده می‌کند. توکن را در هدر Authorization قرار دهید:

```
Authorization: Bearer <your-token>
```

## 🧪 اجرای تست‌ها

```bash
cd Backend
python manage.py test
```

## 📝 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## 🤝 مشارکت

مشارکت‌ها خوش‌آمد هستند! لطفاً Pull Request ارسال کنید.

