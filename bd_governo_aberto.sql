create table cidade(
id_cidade numeric(24),
nome_cidade varchar(50),
id_estado numeric
);

create table delegacia (
id_delegacia numeric,
nome_delegacia varchar(50),
telefone numeric(24),
numero_delegacia numeric 
);

create table distrito(
id_distrito numeric,
nome_distrito varchar(50),
id_cidade numeric (24),
valor_idhm numeric

);

create table endereco(
id_endereco numeric,
rua varchar (50),
numero numeric,
complemento varchar(50),
id_distrito numeric,
num_cep numeric
);

create table entradadados(
id_entrada numeric,
id_infracao numeric ,
id_distrito numeric,
data_ocorrencia date
);

create table estado(
id_estado numeric,
nome_estado varchar(50)
);

create table infracao(
id_infracao numeric,
categoria varchar(50)
);

create table mes (
id_mes numeric,
nome_mes varchar(50)
);

create table ocorrencia(
id_mes numeric,
id_infracao numeric,
num_ocorrencias numeric,
id_ocorrencia numeric,
ano numeric,
id_delegacia numeric,
vitima varchar(50)
);

create table zona(
id_zona numeric,
nome_zona varchar(50)
);