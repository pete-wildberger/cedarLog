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
    comment text
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX shifts_pkey ON shifts(_id int4_ops);
