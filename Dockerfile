FROM php:8.0-fpm

ENV ACCEPT_EULA=Y

# Copy composer.lock and composer.json into the working directory
COPY composer.lock composer.json /var/www/html/
 
# Set working directory
WORKDIR /var/www/html/
 
# Install dependencies for the operating system software
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    libzip-dev \
    unzip \
    git \
    libonig-dev \
    curl 
# taken from https://stackoverflow.com/questions/51933001/install-configure-sql-server-pdo-driver-for-php-docker-image
# RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - 
# RUN curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list 
# RUN apt-get update 
# RUN ACCEPT_EULA=Y apt-get -y --no-install-recommends install msodbcsql17 unixodbc-dev 
# RUN pecl install sqlsrv
# RUN pecl install pdo_sqlsrv
# RUN docker-php-ext-enable sqlsrv pdo_sqlsrv

# taken from https://github.com/danielnv18/php-sqlsrv-example/blob/master/Dockerfile
# Install Dependencies
# RUN apt-get update && apt-get install -y locales unixodbc libgss3 odbcinst \
#     devscripts debhelper dh-exec dh-autoreconf libreadline-dev libltdl-dev \
#     unixodbc-dev wget unzip \
#     && rm -rf /var/lib/apt/lists/* \
#     && docker-php-ext-install pdo \
#     && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen

# # Add Microsoft repo for Microsoft ODBC Driver 17 for Linux
# RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
#     && curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list

# RUN apt-get update && ACCEPT_EULA=Y apt-get install -y \
#     apt-transport-https \
#     msodbcsql17

# # Enable the php extensions.
# RUN pecl install pdo_sqlsrv sqlsrv \
#     && docker-php-ext-enable pdo_sqlsrv sqlsrv

 
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
 
# Install extensions for php
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
 
# Install composer (php package manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
 
# Copy existing application directory contents to the working directory
COPY . /var/www/html
 
# Assign permissions of the working directory to the www-data user
RUN chown -R www-data:www-data \
        /var/www/html/storage \
        /var/www/html/bootstrap/cache
 
# Expose port 9000 and start php-fpm server (for FastCGI Process Manager)
EXPOSE 9000
CMD ["php-fpm"]
