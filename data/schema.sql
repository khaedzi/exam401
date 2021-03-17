DROP TABLE IF NOT exists COONTRY;


(cont,TotalConfirmed,TotalDeaths,TotalRecovered,Date)
CREATE TABLE COONTRY(
id  serial primary key not null,
cont varchar(255) not null,
TotalConfirmed varchar(255) not null,
TotalDeaths varchar(255) NOT null,
Date varchar(255)not null

)