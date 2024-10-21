CREATE DATABASE opup;



CREATE TABLE users (
id VARCHAR(64) NOT NULL UNIQUE,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255),
admin BOOLEAN DEFAULT false,

PRIMARY KEY(id)
);

INSERT INTO users(firstname, lastname, id, email, password, admin) VALUES('Grégoire', 'VAILLANT', '8a898376-b0ef-4882-906c-cabb50d67447', 'vaillant.g@outlook.com', 'Password', true);
INSERT INTO users(id, email, password, admin) VALUES('1ffd1db1-1ab4-4e40-a7a8-065b84f28e7a', 'vaillant.g1@outlook.com', 'Password', false);
INSERT INTO users(id, email, password, admin) VALUES('fd75e8a2-4bdd-46a6-86c2-3159011a2012', 'vaillant.g2@outlook.com', 'Password', false);
INSERT INTO users(id, email, password, admin) VALUES('837531ab-1979-44be-a08b-9186b3f31cec', 'vaillant.g3@outlook.com', 'Password', false);
INSERT INTO users(id, email, password, admin) VALUES('c9340558-e15d-49fe-9bb6-e1087ab6b70d', 'vaillant.g4@outlook.com', 'Password', false);

-- DROP TABLE users;



CREATE TABLE companies (
id VARCHAR(64) NOT NULL UNIQUE,
name VARCHAR(255) NOT NULL UNIQUE,
logo VARCHAR(255) NOT NULL,
description TEXT,

PRIMARY KEY(id)
);

INSERT INTO companies(id, name, logo, description) VALUES('e9f8bf4f-a90b-45aa-be79-34dec472f54a', 'Apple', 'https://www.svgrepo.com/show/315548/chanel.svg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.');
INSERT INTO companies(id, name, logo, description) VALUES('fcc63527-310e-4f91-b085-15906f3de778', 'Amazon', 'https://www.svgrepo.com/show/315548/chanel.svg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.');
INSERT INTO companies(id, name, logo, description) VALUES('84103915-9a2d-4460-9b50-eb68e286bf04', 'Sephora', 'https://www.svgrepo.com/show/315548/chanel.svg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.');
INSERT INTO companies(id, name, logo, description) VALUES('dfd17d4c-daef-4af2-98ad-a4f75fa7a876', 'Levis', 'https://www.svgrepo.com/show/315548/chanel.svg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.');

-- DROP TABLE companies;



CREATE TABLE jobs (
id VARCHAR(64) NOT NULL UNIQUE,
title VARCHAR(55) NOT NULL,
tags JSON,
description TEXT,
desired_profile TEXT, 
company_id VARCHAR(64) NOT NULL,

FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
PRIMARY KEY(id)
);

INSERT INTO jobs(id, title, tags, description, desired_profile, company_id) VALUES('92a3d9eb-9bce-4fa2-a25a-382f91a54fb9', 'Full stack dev', '["coucou","emilieee"]', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.', 'Je desire ce proti', 'e9f8bf4f-a90b-45aa-be79-34dec472f54a');
INSERT INTO jobs(id, title, tags, description, desired_profile, company_id) VALUES('9ef13cb9-c080-42d0-ad22-f1b7051fea43', 'Frontend dev', '["coucou","emilieee"]', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.',  'Je desire ce proti', 'e9f8bf4f-a90b-45aa-be79-34dec472f54a');
INSERT INTO jobs(id, title, tags, description, desired_profile, company_id) VALUES('f69b1551-7d0b-45e9-ba6e-e2913f87d710', 'Backend dev', '["coucou","emilieee"]', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.',  'Je desire ce proti', '84103915-9a2d-4460-9b50-eb68e286bf04');
INSERT INTO jobs(id, title, tags, description, desired_profile, company_id) VALUES('2a3dda1b-319c-49df-be72-1f1d94648f66', 'Dev ops', '["coucou","emilieee"]', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.',  'Je desire ce proti', '84103915-9a2d-4460-9b50-eb68e286bf04');
INSERT INTO jobs(id, title, tags, description, desired_profile, company_id) VALUES('f0d9ca99-04b5-4d74-bf26-60b9a177227e', 'Alternant', '["coucou","emilieee"]', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quis reprehenderit distinctio provident, nam hic. Tempora enim possimus voluptatum aperiam ea exercitationem consequatur, laudantium deserunt temporibus veniam dicta praesentium quam.',  'Je desire ce proti', '84103915-9a2d-4460-9b50-eb68e286bf04');

-- DROP TABLE jobs;



CREATE TYPE status_enum AS ENUM ('nothing', 'seen', 'applied');

CREATE TABLE interactions (
id VARCHAR(64) NOT NULL UNIQUE,
job_id VARCHAR(64) NOT NULL,
user_id VARCHAR(64) NOT NULL,
status status_enum DEFAULT 'nothing',     


FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
PRIMARY KEY(id)  
);

INSERT INTO interactions(id, job_id, user_id) VALUES('0a40d7cd-d638-48c9-b66f-465d746ff2b4', '9ef13cb9-c080-42d0-ad22-f1b7051fea43', '8a898376-b0ef-4882-906c-cabb50d67447');
INSERT INTO interactions(id, job_id, user_id) VALUES('549a8f04-5039-44fb-b56c-55adf5fe80a1', 'f69b1551-7d0b-45e9-ba6e-e2913f87d710', '1ffd1db1-1ab4-4e40-a7a8-065b84f28e7a');
INSERT INTO interactions(id, job_id, user_id) VALUES('b234d017-e288-40e9-afd1-6aa043e7b4dd', 'f0d9ca99-04b5-4d74-bf26-60b9a177227e', '8a898376-b0ef-4882-906c-cabb50d67447');

-- DROP TABLE interactions;


