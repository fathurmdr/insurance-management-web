FROM dunglas/frankenphp:php8.2

ENV SERVER_NAME=:80

RUN apt-get update && apt-get install -y \
    zip \
    libzip-dev \
    libpq-dev \
    &&  php -i \
    && docker-php-ext-install \
    zip \
    pgsql \
    pdo_pgsql \
    && docker-php-ext-enable \
    zip \
    pgsql \
    pdo_pgsql 

COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . /app

RUN composer install
