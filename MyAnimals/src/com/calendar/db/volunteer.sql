
CREATE SEQUENCE VOLUNTEER_SEQUENCE;

CREATE SEQUENCE APPLY_SEQUENCE;


CREATE TABLE VOLUNTEER(
VOLUNTEER_SEQ NUMBER PRIMARY KEY,
CENTER_SEQ NUMBER REFERENCES CENTER(CENTER_SEQ),
MEMBER_ID VARCHAR2(400) REFERENCES MEMBER(MEMBER_ID),
VOLUNTEER_TITLE VARCHAR2(300) NOT NULL,
VOLUNTEER_CONTENT VARCHAR2(1000) NOT NULL,
VOLUNTEER_MAXVOLUNTEER NUMBER NOT NULL,
VOLUNTEER_NOWVOLUNTEER NUMBER,
VOLUNTEER_DATE VARCHAR2(30) NOT NULL
);

INSERT INTO VOLUNTEER VALUES(VOLUNTEER_SEQUENCE.NEXTVAL, 1, '3','되냐?','될껄..',30,0,'20200325')

select * from VOLUNTEER;

CREATE TABLE APPLY(
APPLY_SEQ NUMBER PRIMARY KEY,
VOLUNTEER_SEQ NUMBER REFERENCES VOLUNTEER(VOLUNTEER_SEQ) ON DELETE CASCADE,
MEMBER_ID VARCHAR2(400) REFERENCES MEMBER(MEMBER_ID),
APPLY_PHONE VARCHAR2(300) NOT NULL,
APPLY_NAME VARCHAR2(300) NOT NULL,
APPLY_EMAIL VARCHAR2(300) NOT NULL
);


SELECT * FROM APPLY;

INSERT INTO APPLY VALUES(APPLY_SEQUENCE.NEXTVAL, 1, '3', '010-1234-5678', '3', 'abc@naver.com');

DELETE FROM VOLUNTEER WHERE VOLUNTEER_SEQ = 9;

SELECT * FROM volunteer where CENTER_SEQ = 1;

SELECT * FROM volunteer;

SELECT COUNT(*) FROM VOLUNTEER WHERE CENTER_SEQ = 1;

SELECT COUNT(*) FROM APPLY WHERE VOLUNTEER_SEQ = 1;

update center set member_id = '3' where center_seq = 1;

insert into volunteer values ('ADMIN', '적당히해', '알겠냐?', '20190101', 1, sysdate);