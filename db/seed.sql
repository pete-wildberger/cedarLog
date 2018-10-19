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
