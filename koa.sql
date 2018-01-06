create database backer;
show databases;
use backer;
show tables;
select * from rtcoulmntype;
describe rtcoulmntype;
create database koa;
use koa;
create table user (
	uuid int(8) unique not null primary key,
    name varchar(8) unique not null,
    password varchar(12)
);
show tables;
describe user;
alter table user add column role int(2) default 20;
describe user;
alter table user modify column uuid int(8) unsigned not null;
describe user;
show tables;
drop index uuid on p_event_result;
drop index uuid on s_event_result;
describe p_event_result;
alter table s_event_result add index (uuid);
alter table p_event_result add index (uuid);
describe p_event_result;
use koa;
describe user;
alter table user modify column password varchar(64) not null;
show warnings;
drop table user;
drop database koa;
create database koa;
use koa;
create table user (
	uuid int(8)  unsigned unique   not null primary key auto_increment,
    name varchar(8) not null,
    password varchar(12) not null,
	role int(1) not null default 9
);
create table event (
	uuid int(8) unsigned  unique  not null primary key auto_increment,
    title varchar(255) not null,
    url varchar(255) not null,
	content longtext not null,
    postid int(8) unsigned,
    solveid int(8) unsigned,
    foreign key (postid) references user(uuid),
    foreign key (solveid) references user(uuid),
    create_time timestamp default now() not null
);
create table p_event_result (
    id  int(8) unsigned unique  not null primary key auto_increment,
	uuid int(8) unsigned not null,
    pstatus int1 unsigned default 0 not null,
    pcomment text not null,
    create_time timestamp default now() not null,
    foreign key (uuid) references event(uuid)
);
create table s_event_result (
    id  int(8) unsigned  not null primary key auto_increment,
	uuid int(8) unsigned not null,
    sstatus int1 unsigned default 0 not null,
    scomment text not null,
    create_time timestamp default now() not null,
    foreign key (uuid) references event(uuid)
);
select * from userp_event_resultpstatus;
alter table p_event_result change pstatus status tinyint unsigned default 0 not null;
alter table p_event_result change pcomment comment text not null;
alter table s_event_result change sstatus status tinyint unsigned default 0 not null;
alter table s_event_result change scomment comment text not null;
alter table event modify column title varchar(255) not null;
insert into user (`name`, `password`, `role`) values ('root', 'e10adc3949ba59abbe56e057f20f883e', 1);
select * from user;
delete from user where name not in ('root');
describe event;
insert into event (`title`, `url`, `content`, `postid`, `solveid`) values ('tesxxt', 'test', 'test',  7, 10);
select * from event;
select `title` as `a.b.c` from event where uuid = 1;
use koa;
insert into user (`name`, `password`, `role`) values ('solve', 'e10adc3949ba59abbe56e057f20f883e', 3);
select user.name as name, user.role as role , event.title as title, event.solveid from user join event on user.uuid = event.postid where user.uuid = 5;
select user.name as pname, p.sname as sname, p.solveid as solveid, p.postid as postid from user join (select user.name as sname, event.solveid as solveid , event.postid as postid from user right join event on user.uuid = event.solveid) as p on user.uuid = p.postid;
select * from event;
alter table event drop url;
alter table event add column pstatus int1 unsigned default 0;
alter table event add column sstatus int1 unsigned default 0;
select * from p_event_result;
alter table p_event_result drop column status;
alter table s_event_result drop column status;
update event  set pstatus = 1 where title = 'test';
update 	event set pstatus = 1 where uuid = 6;
select * from event order by  pstatus desc, title;






















