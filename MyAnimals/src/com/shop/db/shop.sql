create sequence shopseq;

CREATE TABLE shop (
       shop_seq number primary key,
       shop_name varchar2(1000) not null,
       shop_kind varchar2(100) not null,
       shop_price number not null,
       shop_quantity number not null,
       shop_content varchar2(1000) not null,
       shop_photo varchar2(1000)
);

drop table shop;

insert into shop values(shopseq.nextval ,'test', 'test', 1000, 1000, 'test', '');
insert into shop values(shopseq.nextval ,'test1', 'test1', 1000, 1000, 'test1', '');
insert into shop values(shopseq.nextval ,'test2', 'test2', 1000, 1000, 'test2', '');
insert into shop values(shopseq.nextval ,'test3', 'test3', 1000, 1000, 'test3', '');
insert into shop values(shopseq.nextval ,'test4', 'test4', 1000, 1000, 'test4', '');
insert into shop values(shopseq.nextval ,'test5', 'test5', 1000, 1000, 'test5', '');
insert into shop values(shopseq.nextval ,'test6', 'test6', 1000, 1000, 'test6', '');
insert into shop values(shopseq.nextval ,'test7', 'test7', 1000, 1000, 'test7', '');
insert into shop values(shopseq.nextval ,'test8', 'test8', 1000, 1000, 'test8', '');
insert into shop values(shopseq.nextval ,'test9', 'test9', 1000, 1000, 'test9', '');
insert into shop values(shopseq.nextval ,'test10', 'test10', 1000, 1000, 'test10', '');
insert into shop values(shopseq.nextval ,'hehe10', 'hehe10', 1000, 1000, 'hehe10', '');

insert into shop values(shopseq.nextval ,'name', 'justname', 1000, 1000, 'justname', '');
insert into shop values(shopseq.nextval ,'justcontent', 'justcontent', 1000, 1000, 'content', '');
insert into shop values(shopseq.nextval ,'together', 'together', 1000, 1000, 'together', '');

select * from shop where shop_name like'%he%';


