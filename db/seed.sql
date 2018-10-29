-- Table Definition ----------------------------------------------

CREATE TABLE events (
    _id integer DEFAULT nextval('untitled_table__id_seq'::regclass) PRIMARY KEY,
    title character varying(200) NOT NULL UNIQUE,
    date character varying(28) NOT NULL,
    doors character varying(28) NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX untitled_table_pkey ON events(_id int4_ops);
CREATE UNIQUE INDEX events_title_key ON events(title text_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE shifts (
    _id SERIAL PRIMARY KEY,
    event_id integer NOT NULL,
    user_id integer NOT NULL,
    shift character varying(32) NOT NULL,
    deleted boolean NOT NULL DEFAULT false,
    approved boolean NOT NULL DEFAULT false,
    approved_by integer,
    approved_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    comment text,
    hours double precision NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX shifts_pkey ON shifts(_id int4_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE users (
    _id SERIAL PRIMARY KEY,
    first_name character varying(24),
    last_name character varying(60),
    email character varying(60) NOT NULL UNIQUE,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    password character varying(60) NOT NULL,
    deleted boolean NOT NULL DEFAULT false,
    admin boolean NOT NULL DEFAULT false
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX users_pkey ON users(_id int4_ops);
CREATE UNIQUE INDEX users_email_key ON users(email text_ops);
