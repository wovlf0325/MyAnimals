
create table alarm 
(
	alarm_date date
);

insert into alarm values (SYSDATE);
SELECT * FROM alarm where trunc(TO_DATE(ALARM_DATE,'yyyymmdd')) - trunc(TO_DATE('20190228','yyyymmdd')) <=7

select * from alarm;
select * from member;

insert into member values (
'a', 'a', 'a', '10', 'sasumpi123@naver.com', 'M', '경', 'USER', 'N', SYSDATE, '010-4871-5771', '성훈'
);



select * from VOLUNTEER;