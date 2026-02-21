import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * Supabase Keep-Alive Cron Job
 * 
 * This endpoint is called weekly by Vercel Cron to prevent the Supabase free tier
 * database from going to sleep due to inactivity. It performs a simple read operation
 * that doesn't affect any application functionality.
 * 
 * Configured in vercel.json to run every Sunday at 2:00 AM UTC
 */
export async function GET(request: Request) {
    try {
        // Verify this is a cron job request (Vercel adds this header)
        const authHeader = request.headers.get('authorization')

        // In production, Vercel Cron adds a special header
        // For local testing, we'll allow requests without it
        if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Perform a simple database read operation
        // We'll just count the number of quotes (lightweight query)
        const { count, error } = await supabase
            .from('quotes')
            .select('*', { count: 'exact', head: true })

        if (error) {
            console.error('Keep-alive cron error:', error)
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                    timestamp: new Date().toISOString()
                },
                { status: 500 }
            )
        }

        console.log(`Keep-alive cron executed successfully. Database active. Record count: ${count}`)

        return NextResponse.json({
            success: true,
            message: 'Database keep-alive ping successful',
            recordCount: count,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('Keep-alive cron exception:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        )
    }
}
