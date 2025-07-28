--Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


--User table
CREATE TABLE users (
id UUID PRIMARYKEY DEFAULT gen_random_uuid(),
email VARCHAR(255) UNIQUE NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
full_name VARCHAR(255),
customer_id VARCHAR(255) UNIQUE,
price_id VARCHAR(255),
status VARCHAR(50) DEFAULT 'inactive'
);

--PDF Summaries table for storing PD proccessing result
CREATE TABLE pdf_summaries(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id VARCHAR(255) NOT NULL,
orignal_file_url TEXT NOT NULL,
summary_text TEXT NOT NULL,
status VARCHAR(50) DEFAULT 'completed',
title TEXT,
file_name TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);
--Payments table
CREATE table payments(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
amount INTEGER NOT NULL,
status VARCHAR(255) NOT NULL,
stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
price_id VARCHAR(255) NOT NULL
user_id VARCHAR(255) NOT NULL REFERENCES users(email),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
     NEW.updated_at = CURRENT_TIMESTAMP;
     RETURN NEW;
END;
$$ language 'plpgsql';

--Add triggers to update updated_at
CREATE TRIGGER update_users_updated_at
   BEFORE UPDATE ON users 
   FOR EACH ROW 
   EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_summaries_updated_at
    BEFORE UPDATE ON pdf_summaries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

