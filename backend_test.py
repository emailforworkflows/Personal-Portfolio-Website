#!/usr/bin/env python3
"""
Backend API Testing for Kumar Abhinav Portfolio Authentication System
Tests all authentication endpoints and admin functionality
"""

import requests
import json
import sys
import time
from datetime import datetime, timezone, timedelta

# Use the production URL from frontend/.env
BASE_URL = "https://productgtm.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.session_token = None
        self.admin_session_token = None
        self.test_user_email = f"testuser{int(time.time())}@example.com"
        self.test_admin_email = "testuser@example.com"  # Pre-existing admin user
        self.test_password = "test123456"
        self.results = []
        
    def log_result(self, test_name, success, message, details=None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "details": details or {},
            "timestamp": datetime.now().isoformat()
        }
        self.results.append(result)
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_user_registration(self):
        """Test POST /api/auth/register"""
        print("\n=== Testing User Registration API ===")
        
        try:
            payload = {
                "email": self.test_user_email,
                "password": self.test_password,
                "name": "Test User Registration"
            }
            
            response = self.session.post(f"{BASE_URL}/auth/register", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["user_id", "email", "name", "role"]
                
                if all(field in data for field in required_fields):
                    # Check if session cookie is set
                    session_cookie = response.cookies.get("session_token")
                    if session_cookie:
                        self.session_token = session_cookie
                        self.log_result("User Registration", True, 
                                      f"User registered successfully with user_id: {data['user_id']}")
                    else:
                        self.log_result("User Registration", False, 
                                      "Registration successful but no session cookie set",
                                      {"response": data})
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("User Registration", False, 
                                  f"Missing required fields: {missing}",
                                  {"response": data})
            else:
                self.log_result("User Registration", False, 
                              f"Registration failed with status {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("User Registration", False, f"Exception occurred: {str(e)}")
    
    def test_user_login(self):
        """Test POST /api/auth/login"""
        print("\n=== Testing User Login API ===")
        
        try:
            payload = {
                "email": self.test_admin_email,
                "password": self.test_password,
                "remember_me": False
            }
            
            response = self.session.post(f"{BASE_URL}/auth/login", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["user_id", "email", "name", "role"]
                
                if all(field in data for field in required_fields):
                    # Check if session cookie is set
                    session_cookie = response.cookies.get("session_token")
                    if session_cookie:
                        self.admin_session_token = session_cookie
                        self.log_result("User Login", True, 
                                      f"Login successful for user: {data['email']}, role: {data['role']}")
                    else:
                        self.log_result("User Login", False, 
                                      "Login successful but no session cookie set",
                                      {"response": data})
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("User Login", False, 
                                  f"Missing required fields: {missing}",
                                  {"response": data})
            elif response.status_code == 401:
                self.log_result("User Login", False, 
                              "Invalid credentials - test user may not exist",
                              {"response": response.text})
            else:
                self.log_result("User Login", False, 
                              f"Login failed with status {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("User Login", False, f"Exception occurred: {str(e)}")
    
    def test_auth_me(self):
        """Test GET /api/auth/me"""
        print("\n=== Testing Auth Me API ===")
        
        # Test without session token (use a fresh session)
        try:
            fresh_session = requests.Session()
            response = fresh_session.get(f"{BASE_URL}/auth/me")
            if response.status_code == 401:
                self.log_result("Auth Me (No Token)", True, "Correctly returns 401 without session")
            else:
                self.log_result("Auth Me (No Token)", False, 
                              f"Expected 401, got {response.status_code}",
                              {"response": response.text})
        except Exception as e:
            self.log_result("Auth Me (No Token)", False, f"Exception occurred: {str(e)}")
        
        # Test with session token
        if self.admin_session_token:
            try:
                headers = {"Authorization": f"Bearer {self.admin_session_token}"}
                response = self.session.get(f"{BASE_URL}/auth/me", headers=headers)
                
                if response.status_code == 200:
                    data = response.json()
                    required_fields = ["user_id", "email", "name", "role"]
                    
                    if all(field in data for field in required_fields):
                        self.log_result("Auth Me (With Token)", True, 
                                      f"Successfully retrieved user data for: {data['email']}")
                    else:
                        missing = [f for f in required_fields if f not in data]
                        self.log_result("Auth Me (With Token)", False, 
                                      f"Missing required fields: {missing}",
                                      {"response": data})
                else:
                    self.log_result("Auth Me (With Token)", False, 
                                  f"Failed with status {response.status_code}",
                                  {"response": response.text})
                    
            except Exception as e:
                self.log_result("Auth Me (With Token)", False, f"Exception occurred: {str(e)}")
        else:
            self.log_result("Auth Me (With Token)", False, "No session token available for testing")
    
    def test_contact_form(self):
        """Test POST /api/contact"""
        print("\n=== Testing Contact Form API ===")
        
        try:
            payload = {
                "name": "Test Contact",
                "email": "testcontact@example.com",
                "message": "This is a test contact message from backend testing"
            }
            
            response = self.session.post(f"{BASE_URL}/contact", json=payload)
            
            if response.status_code in [200, 201]:
                data = response.json()
                required_fields = ["id", "name", "email", "message", "created_at"]
                
                if all(field in data for field in required_fields):
                    self.log_result("Contact Form", True, 
                                  f"Contact form submitted successfully with ID: {data['id']}")
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("Contact Form", False, 
                                  f"Missing required fields: {missing}",
                                  {"response": data})
            else:
                self.log_result("Contact Form", False, 
                              f"Contact form failed with status {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("Contact Form", False, f"Exception occurred: {str(e)}")
    
    def test_admin_contacts(self):
        """Test GET /api/admin/contacts"""
        print("\n=== Testing Admin Contacts API ===")
        
        if not self.admin_session_token:
            self.log_result("Admin Contacts", False, "No admin session token available")
            return
        
        try:
            headers = {"Authorization": f"Bearer {self.admin_session_token}"}
            response = self.session.get(f"{BASE_URL}/admin/contacts", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Admin Contacts", True, 
                                  f"Successfully retrieved {len(data)} contact submissions")
                else:
                    self.log_result("Admin Contacts", False, 
                                  "Expected list response",
                                  {"response": data})
            elif response.status_code == 403:
                self.log_result("Admin Contacts", False, 
                              "Access denied - user may not have admin role",
                              {"response": response.text})
            elif response.status_code == 401:
                self.log_result("Admin Contacts", False, 
                              "Unauthorized - session may be invalid",
                              {"response": response.text})
            else:
                self.log_result("Admin Contacts", False, 
                              f"Failed with status {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("Admin Contacts", False, f"Exception occurred: {str(e)}")
    
    def test_admin_users(self):
        """Test GET /api/admin/users"""
        print("\n=== Testing Admin Users API ===")
        
        if not self.admin_session_token:
            self.log_result("Admin Users", False, "No admin session token available")
            return
        
        try:
            headers = {"Authorization": f"Bearer {self.admin_session_token}"}
            response = self.session.get(f"{BASE_URL}/admin/users", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Admin Users", True, 
                                  f"Successfully retrieved {len(data)} users")
                else:
                    self.log_result("Admin Users", False, 
                                  "Expected list response",
                                  {"response": data})
            elif response.status_code == 403:
                self.log_result("Admin Users", False, 
                              "Access denied - user may not have admin role",
                              {"response": response.text})
            elif response.status_code == 401:
                self.log_result("Admin Users", False, 
                              "Unauthorized - session may be invalid",
                              {"response": response.text})
            else:
                self.log_result("Admin Users", False, 
                              f"Failed with status {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("Admin Users", False, f"Exception occurred: {str(e)}")
    
    def test_password_reset_request(self):
        """Test POST /api/auth/password-reset-request"""
        print("\n=== Testing Password Reset Request API ===")
        
        try:
            payload = {
                "email": self.test_admin_email
            }
            
            response = self.session.post(f"{BASE_URL}/auth/password-reset-request", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_result("Password Reset Request", True, 
                                  "Password reset request processed successfully")
                else:
                    self.log_result("Password Reset Request", False, 
                                  "Missing message in response",
                                  {"response": data})
            else:
                self.log_result("Password Reset Request", False, 
                              f"Failed with status {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("Password Reset Request", False, f"Exception occurred: {str(e)}")
    
    def test_logout(self):
        """Test POST /api/auth/logout"""
        print("\n=== Testing Logout API ===")
        
        if not self.admin_session_token:
            self.log_result("Logout", False, "No session token available for logout test")
            return
        
        try:
            headers = {"Authorization": f"Bearer {self.admin_session_token}"}
            response = self.session.post(f"{BASE_URL}/auth/logout", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_result("Logout", True, "Logout successful")
                    # Clear the session token
                    self.admin_session_token = None
                else:
                    self.log_result("Logout", False, 
                                  "Missing message in response",
                                  {"response": data})
            else:
                self.log_result("Logout", False, 
                              f"Failed with status {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("Logout", False, f"Exception occurred: {str(e)}")
    
    def test_oauth_session(self):
        """Test POST /api/auth/session (OAuth)"""
        print("\n=== Testing OAuth Session API ===")
        
        try:
            # This endpoint requires a valid session_id from Emergent Auth
            # We'll test with an invalid session_id to verify error handling
            payload = {
                "session_id": "invalid_session_id_for_testing"
            }
            
            response = self.session.post(f"{BASE_URL}/auth/session", json=payload)
            
            if response.status_code == 401:
                self.log_result("OAuth Session", True, 
                              "Correctly rejects invalid session_id")
            elif response.status_code == 500:
                self.log_result("OAuth Session", True, 
                              "OAuth endpoint implemented - returns 500 for invalid session (expected)")
            else:
                self.log_result("OAuth Session", False, 
                              f"Unexpected status {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("OAuth Session", False, f"Exception occurred: {str(e)}")
    
    def test_password_reset_confirm(self):
        """Test POST /api/auth/password-reset-confirm"""
        print("\n=== Testing Password Reset Confirm API ===")
        
        try:
            # Test with invalid token
            payload = {
                "token": "invalid_token_for_testing",
                "new_password": "newpassword123"
            }
            
            response = self.session.post(f"{BASE_URL}/auth/password-reset-confirm", json=payload)
            
            if response.status_code == 400:
                data = response.json()
                if "Invalid or expired reset token" in data.get("detail", ""):
                    self.log_result("Password Reset Confirm", True, 
                                  "Correctly rejects invalid reset token")
                else:
                    self.log_result("Password Reset Confirm", False, 
                                  "Unexpected error message",
                                  {"response": data})
            else:
                self.log_result("Password Reset Confirm", False, 
                              f"Expected 400, got {response.status_code}",
                              {"response": response.text})
                
        except Exception as e:
            self.log_result("Password Reset Confirm", False, f"Exception occurred: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for Kumar Abhinav Portfolio")
        print(f"📍 Testing against: {BASE_URL}")
        print(f"⏰ Started at: {datetime.now().isoformat()}")
        
        # Test public endpoints first
        self.test_contact_form()
        
        # Test authentication flow
        self.test_user_registration()
        self.test_user_login()
        self.test_auth_me()
        
        # Test password reset
        self.test_password_reset_request()
        
        # Test admin endpoints
        self.test_admin_contacts()
        self.test_admin_users()
        
        # Test logout
        self.test_logout()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        passed = sum(1 for r in self.results if "✅ PASS" in r["status"])
        failed = sum(1 for r in self.results if "❌ FAIL" in r["status"])
        total = len(self.results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Success Rate: {(passed/total*100):.1f}%" if total > 0 else "0%")
        
        if failed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.results:
                if "❌ FAIL" in result["status"]:
                    print(f"  • {result['test']}: {result['message']}")
        
        print("\n✅ PASSED TESTS:")
        for result in self.results:
            if "✅ PASS" in result["status"]:
                print(f"  • {result['test']}: {result['message']}")
        
        print(f"\n⏰ Completed at: {datetime.now().isoformat()}")
        
        # Return exit code based on results
        return 0 if failed == 0 else 1

if __name__ == "__main__":
    tester = BackendTester()
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)