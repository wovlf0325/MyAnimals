inDROP SEQUENCE REPLY_SEQSEQ;

DROP TABLE REPLY;

CREATE SEQUENCE REPLY_SEQSEQ;

CREATE TABLE REPLY(
REPLY_SEQ NUMBER PRIMARY KEY,
BOARD_SEQ NUMBER NOT NULL,
MEMBER_ID VARCHAR2(100) NOT NULL,
REPLY_CONTENT VARCHAR2(400) NOT NULL,
REPLY_REGDATE DATE NOT NULL,
FOREIGN KEY(BOARD_SEQ) REFERENCES BOARD(BOARD_SEQ),
FOREIGN KEY(MEMBER_ID) REFERENCES MEMBER(MEMBER_ID)
);

INSER INTO REPLY 
VALUES(REPLY_SEQSEQ.NEXTVAL,0,'글쓴이','글쓴이 내용입니다.',SYSDATE);

SELECT * FROM REPLY ODRER BY RELPY_SEQ DESC ;

select * from member;
select * from board;