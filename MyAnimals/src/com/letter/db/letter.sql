DROP SEQUENCE LETTERSEQ;
DROP TABLE LETTER;

CREATE SEQUENCE LETTERSEQ;
CREATE TABLE LETTER(
	LETTER_SEQ NUMBER NOT NULL,
	MEMBER_FROM VARCHAR2(50) REFERENCES MEMBER (MEMBER_ID),
	MEMBER_TO VARCHAR2(50) REFERENCES MEMBER (MEMBER_ID),
	LETTER_TITLE VARCHAR2(300) NOT NULL,
	LETTER_CONTENT VARCHAR2(600) NOT NULL,
	LETTER_REGDATE DATE NOT NULL,
	LETTER_READ VARCHAR2(2) NOT NULL,
	CONSTRAINT LT_RD_CK CHECK (LETTER_READ IN ('Y','N')),
	CONSTRAINT LT_PK PRIMARY KEY (LETTER_SEQ, MEMBER_FROM, MEMBER_TO)
);

INSERT INTO LETTER VALUES(LETTERSEQ.NEXTVAL, 'ADMIN', 'TEST', '쪽지', '내용', SYSDATE, 'N');
INSERT INTO LETTER VALUES(LETTERSEQ.NEXTVAL, 'TEST', 'ADMIN', '쪽지', '내용', SYSDATE, 'N');

SELECT * FROM LETTER;

SELECT * FROM TAB;

SELECT * FROM LETTER WHERE MEMBER_TO = 'ADMIN';

SELECT * FROM LETTER WHERE MEMBER_TO = 'ADMIN' AND LETTER_SEQ = 8;

DELETE FROM LETTER WHERE MEMBER_TO = 'ADMIN' AND LETTER_SEQ IN    (      10    ,     11    );




