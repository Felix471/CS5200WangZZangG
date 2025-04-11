const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {

    console.log(`${req.method} ${req.path}`);
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    if (req.method === 'POST' && !req.body) {
        console.error('Request body is empty or not parsed correctly');
        return res.status(400).json({ message: 'Request body is required' });
    }

    // Simulated delay to mimic real network requests
    setTimeout(() => {
        // Custom route for login
        if (req.method === 'POST' && (req.path === '/login' || req.path === '/auth/login')) {
            const email = req.body?.email;
            const password = req.body?.password;

            console.log('Login attempt:', { email, password });

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            // Patient login
            if (email === 'john@example.com' && password === 'password') {
                return res.status(200).json({
                    token: 'fake-jwt-token-for-testing',
                    user: {
                        id: 1,
                        name: 'John Doe',
                        email: 'john@example.com',
                        role: 'patient',
                        created_at: '2025-01-01T00:00:00.000Z',
                        updated_at: '2025-01-01T00:00:00.000Z'
                    }
                });
            }

            // Dentist login
            if (email === 'smith@example.com' && password === 'password') {
                res.status(200).json({
                    token: 'fake-jwt-token-for-doctor',
                    user: {
                        id: 2,
                        name: 'Dr. Smith',
                        email: 'smith@example.com',
                        role: 'doctor',
                        created_at: '2025-01-01T00:00:00.000Z',
                        updated_at: '2025-01-01T00:00:00.000Z'
                    }
                });
                return;
            }

            // Invalid credentials
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Custom route for registration
        if (req.method === 'POST' && req.path === '/register') {
            const { email, name, password } = req.body;

            // Check if email already exists
            if (email === 'john@example.com') {
                res.status(400).json({ message: 'Email already in use' });
                return;
            }

            // Return success with fake token
            res.status(201).json({
                token: 'fake-jwt-token-for-new-user',
                user: {
                    id: 999, // New user id
                    name: name,
                    email: email,
                    role: 'patient',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            });
            return;
        }

        // Custom route for getting current user
        if (req.method === 'GET' && req.path === '/me') {
            // Check Authorization header to simulate authentication
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            // Simulate getting user based on token
            const token = authHeader.split(' ')[1];

            if (token === 'fake-jwt-token-for-testing') {
                res.status(200).json({
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'patient',
                    created_at: '2025-01-01T00:00:00.000Z',
                    updated_at: '2025-01-01T00:00:00.000Z'
                });
                return;
            }

            if (token === 'fake-jwt-token-for-doctor') {
                res.status(200).json({
                    id: 2,
                    name: 'Dr. Smith',
                    email: 'smith@example.com',
                    role: 'doctor',
                    department: 'General Dentistry',
                    created_at: '2025-01-01T00:00:00.000Z',
                    updated_at: '2025-01-01T00:00:00.000Z'
                });
                return;
            }

            // Invalid token
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        // Custom route for getting treatments by department
        if (req.method === 'GET' && req.path === '/treatments' && req.query.department) {
            const { department } = req.query;
            const dbPath = path.resolve(__dirname, 'db.json');
            const dbData = fs.readFileSync(dbPath, 'utf8');
            const db = JSON.parse(dbData);

            const filteredTreatments = db.treatments.filter(
                treatment => treatment.department === department
            );

            res.status(200).json(filteredTreatments);
            return;
        }

        // Custom route for getting available slots for a specific doctor
        if (req.method === 'GET' && req.path === '/appointments/available-slots' && req.query.doctor_id && req.query.date) {
            const { doctor_id, date } = req.query;
            const dbPath = path.resolve(__dirname, 'db.json');
            const dbData = fs.readFileSync(dbPath, 'utf8');
            const db = JSON.parse(dbData);

            // Return available slots from the slots data
            // In a real system, this would filter out already booked slots for this doctor
            if (db['available-slots'][date]) {
                res.status(200).json(db['available-slots'][date]);
            } else {
                // If no slots for this date, return empty array
                res.status(200).json([]);
            }
            return;
        }

        // Continue with normal json-server routing
        next();
    }, 500); // 500ms delay
};