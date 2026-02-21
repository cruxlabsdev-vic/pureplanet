const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
    const sqlPath = path.join(__dirname, '..', 'supabase-migration-add-read-to-reminders.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Supabase-js doesn't have a direct "query" method for raw SQL unless via RPC or specific plugins.
    // HOWEVER, we can usually cheat by creating a Postgres function via the SQL editor in the dashboard...
    // Wait, if I can't run SQL, I can't create the function.

    // Alternative: Use the Postgres connection string if available.
    // The user didn't provide a Postgres connection string, only the API key.

    // IF I cannot run SQL, I might be stuck unless there is an existing RPC.
    // BUT earlier I used the Supabase MCP server. Why did it fail?
    // "Your account does not have the necessary privileges..."

    // Let's try to use the REST API to check if the column exists first (by selecting it).
    // If it doesn't, I might have to ask the user to run the SQL in their dashboard.

    console.log("Checking if column exists...");
    const { error } = await supabase.from('follow_up_reminders').select('is_read').limit(1);

    if (error && error.message.includes('column "is_read" does not exist')) {
        console.log("Column missing. Please run the migration SQL in your Supabase Dashboard SQL Editor.");
        console.log("\nSQL CONTENT:\n" + sql);
    } else if (!error) {
        console.log("Column 'is_read' already exists.");
    } else {
        console.error("Error checking column:", error);
    }
}

runMigration();
