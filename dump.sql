--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE calendar IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Event; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Event" (
    "EventID" integer NOT NULL,
    "GroupID" integer,
    "UserID" integer NOT NULL
);


ALTER TABLE "Event" OWNER TO calendar;

--
-- Name: Event_EventID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Event_EventID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Event_EventID_seq" OWNER TO calendar;

--
-- Name: Event_EventID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Event_EventID_seq" OWNED BY "Event"."EventID";


--
-- Name: Group_User_Rel; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Group_User_Rel" (
    "RelationshipID" integer NOT NULL,
    "GroupID" integer NOT NULL,
    "UserID" integer NOT NULL
);


ALTER TABLE "Group_User_Rel" OWNER TO calendar;

--
-- Name: Group_User_Rel_RelationshipID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Group_User_Rel_RelationshipID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Group_User_Rel_RelationshipID_seq" OWNER TO calendar;

--
-- Name: Group_User_Rel_RelationshipID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Group_User_Rel_RelationshipID_seq" OWNED BY "Group_User_Rel"."RelationshipID";


--
-- Name: Groups; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Groups" (
    "OrgID" integer,
    "IsGlobal" boolean DEFAULT false NOT NULL,
    "GroupID" integer NOT NULL
);


ALTER TABLE "Groups" OWNER TO calendar;

--
-- Name: Groups_GroupID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Groups_GroupID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Groups_GroupID_seq" OWNER TO calendar;

--
-- Name: Groups_GroupID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Groups_GroupID_seq" OWNED BY "Groups"."GroupID";


--
-- Name: Organization_Invitations; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Organization_Invitations" (
    "InvitationID" integer NOT NULL,
    "OrgID" integer NOT NULL,
    "Email" text
);


ALTER TABLE "Organization_Invitations" OWNER TO calendar;

--
-- Name: Org_Invitations_InvitationID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Org_Invitations_InvitationID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Org_Invitations_InvitationID_seq" OWNER TO calendar;

--
-- Name: Org_Invitations_InvitationID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Org_Invitations_InvitationID_seq" OWNED BY "Organization_Invitations"."InvitationID";


--
-- Name: Organizations; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Organizations" (
    "OrgID" integer NOT NULL,
    "Name" text NOT NULL
);


ALTER TABLE "Organizations" OWNER TO calendar;

--
-- Name: Organization_OrgID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Organization_OrgID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Organization_OrgID_seq" OWNER TO calendar;

--
-- Name: Organization_OrgID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Organization_OrgID_seq" OWNED BY "Organizations"."OrgID";


--
-- Name: Organization_User_Rel; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Organization_User_Rel" (
    "RelationshipID" integer NOT NULL,
    "OrgID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "Role" text
);


ALTER TABLE "Organization_User_Rel" OWNER TO calendar;

--
-- Name: Organization_User_Rel_RelationshipID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Organization_User_Rel_RelationshipID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Organization_User_Rel_RelationshipID_seq" OWNER TO calendar;

--
-- Name: Organization_User_Rel_RelationshipID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Organization_User_Rel_RelationshipID_seq" OWNED BY "Organization_User_Rel"."RelationshipID";


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Users" (
    "UserID" integer NOT NULL,
    "FirstName" text NOT NULL,
    "LastName" text NOT NULL,
    "Email" text NOT NULL,
    "ProviderHash" text NULL
);


ALTER TABLE "Users" OWNER TO calendar;

CREATE SEQUENCE "UserID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "UserID_seq" OWNER TO calendar;

ALTER SEQUENCE "UserID_seq" OWNED BY "Users"."UserID";

--
-- Name: EventID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Event" ALTER COLUMN "EventID" SET DEFAULT nextval('"Event_EventID_seq"'::regclass);


--
-- Name: RelationshipID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Group_User_Rel" ALTER COLUMN "RelationshipID" SET DEFAULT nextval('"Group_User_Rel_RelationshipID_seq"'::regclass);


--
-- Name: GroupID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Groups" ALTER COLUMN "GroupID" SET DEFAULT nextval('"Groups_GroupID_seq"'::regclass);


--
-- Name: InvitationID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Organization_Invitations" ALTER COLUMN "InvitationID" SET DEFAULT nextval('"Org_Invitations_InvitationID_seq"'::regclass);


--
-- Name: RelationshipID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Organization_User_Rel" ALTER COLUMN "RelationshipID" SET DEFAULT nextval('"Organization_User_Rel_RelationshipID_seq"'::regclass);


--
-- Name: OrgID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Organizations" ALTER COLUMN "OrgID" SET DEFAULT nextval('"Organization_OrgID_seq"'::regclass);

ALTER TABLE ONLY "Users" ALTER COLUMN "UserID" SET DEFAULT nextval('"UserID_seq"'::regclass);


--
-- Name: Event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("EventID");


--
-- Name: Group_User_Rel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Group_User_Rel"
    ADD CONSTRAINT "Group_User_Rel_pkey" PRIMARY KEY ("RelationshipID");


--
-- Name: Groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Groups"
    ADD CONSTRAINT "Groups_pkey" PRIMARY KEY ("GroupID");


--
-- Name: Organization_Invitations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Organization_Invitations"
    ADD CONSTRAINT "Organization_Invitations_pkey" PRIMARY KEY ("InvitationID");


--
-- Name: Organization_User_Rel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Organization_User_Rel"
    ADD CONSTRAINT "Organization_User_Rel_pkey" PRIMARY KEY ("RelationshipID");


--
-- Name: Organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Organizations"
    ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("OrgID");


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID");


--
-- Name: Event_GroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Event"
    ADD CONSTRAINT "Event_GroupID_fkey" FOREIGN KEY ("GroupID") REFERENCES "Groups"("GroupID");


--
-- Name: Event_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Event"
    ADD CONSTRAINT "Event_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID");


--
-- Name: Group_User_Rel_GroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Group_User_Rel"
    ADD CONSTRAINT "Group_User_Rel_GroupID_fkey" FOREIGN KEY ("GroupID") REFERENCES "Groups"("GroupID");


--
-- Name: Group_User_Rel_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Group_User_Rel"
    ADD CONSTRAINT "Group_User_Rel_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID");


--
-- Name: Groups_OrgID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Groups"
    ADD CONSTRAINT "Groups_OrgID_fkey" FOREIGN KEY ("OrgID") REFERENCES "Organizations"("OrgID");


--
-- Name: Organization_Invitations_OrgID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Organization_Invitations"
    ADD CONSTRAINT "Organization_Invitations_OrgID_fkey" FOREIGN KEY ("OrgID") REFERENCES "Organizations"("OrgID");


--
-- Name: Organization_User_Rel_OrgID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Organization_User_Rel"
    ADD CONSTRAINT "Organization_User_Rel_OrgID_fkey" FOREIGN KEY ("OrgID") REFERENCES "Organizations"("OrgID");


--
-- Name: Organization_User_Rel_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Organization_User_Rel"
    ADD CONSTRAINT "Organization_User_Rel_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID");


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM calendar;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO calendar;
--GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

