
import { validateUserCredentials, registerNewUser } from '../services/auth.service.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await validateUserCredentials(email, password);

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        
        res.json({ message: "Login exitoso", user });
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};


export const register = async (req, res) => {
    try {
        const newUser = await registerNewUser(req.body);
        res.status(201).json({ message: "Usuario registrado exitosamente.", userId: newUser.id });
    } catch (error) {
     
        if (error.message === "El correo electrónico ya está registrado.") {
            return res.status(409).json({ message: error.message }); 
        }
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};


