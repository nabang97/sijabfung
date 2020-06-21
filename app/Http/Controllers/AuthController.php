<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function login(){       
        
        return view('login');
    }

    public function postLogin(Request $request){
        
        // $credentials = $request->only('nip', 'password');

        if (Auth::attempt(['nip' => $request->email, 'password' => $request->password,  'role'=> 1]) || 
            Auth::attempt(['email' => $request->email,'password' => $request->password, 'role'=> 1])) {
            return redirect('admin/golongan');
        }

        if (Auth::attempt(['nip' => $request->email, 'password' => $request->password,  'role'=> 2]) || 
            Auth::attempt(['email' => $request->email,'password' => $request->password, 'role'=> 2])) {
            return redirect('/');
        }
        
        return back()->withErrors(['Username dan Password Salah']);
    }

    public function logout(){

        Auth::logout();

        return redirect('/login');
    }

    // public function getUserInformation(Request $request){
    //     $credentials1 = $request->only('email', 'password');

    //     if (Auth::attempt($credentials1)) {
    //         return redirect('admin/golongan');  
    //     }
        
    //     return back()->withErrors(['Username dan Password Salah']);
    // }
}
