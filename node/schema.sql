drop table if exists veiculos;

create table veiculos (
	id serial primary key,
  	veiculo text not null,
  	marca text not null,
  	ano integer not null,
  	descricao text not null,
  	vendido bool not null,
  	created timestamp default now(),
  	updated timestamp
);