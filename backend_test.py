#!/usr/bin/env python3
"""
Backend API Testing for Desa Bumi Dipasena Makmur Website
Tests MongoDB connection, authentication, and News CRUD operations
"""

import requests
import json
import os
from datetime import datetime

# Get base URL from environment - using localhost for testing
BASE_URL = "http://localhost:3000"
API_BASE = f"{BASE_URL}/api"

class BackendTester:
    def __init__(self):
        self.auth_token = None
        self.test_results = {
            "mongodb_connection": {"status": "pending", "details": []},
            "authentication": {"status": "pending", "details": []},
            "news_crud": {"status": "pending", "details": []},
            "overall": {"status": "pending", "passed": 0, "failed": 0}
        }
        
    def log_result(self, category, test_name, success, message, response_data=None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        detail = {
            "test": test_name,
            "status": status,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        if response_data:
            detail["response"] = response_data
            
        self.test_results[category]["details"].append(detail)
        
        if success:
            self.test_results["overall"]["passed"] += 1
        else:
            self.test_results["overall"]["failed"] += 1
            
        print(f"{status} {test_name}: {message}")
        
    def test_mongodb_connection(self):
        """Test MongoDB connection and basic API functionality"""
        print("\n=== Testing MongoDB Connection and Database Setup ===")
        
        try:
            # Test basic API endpoint
            response = requests.get(f"{API_BASE}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_result("mongodb_connection", "Basic API Connection", True, 
                                  f"API responding correctly: {data.get('message')}")
                else:
                    self.log_result("mongodb_connection", "Basic API Connection", False, 
                                  f"API returned success=false: {data}")
            else:
                self.log_result("mongodb_connection", "Basic API Connection", False, 
                              f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("mongodb_connection", "Basic API Connection", False, 
                          f"Connection error: {str(e)}")
            
        # Test news collection access (should work even without data)
        try:
            response = requests.get(f"{API_BASE}/news", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    news_count = len(data.get("data", []))
                    self.log_result("mongodb_connection", "News Collection Access", True, 
                                  f"Successfully accessed news collection with {news_count} items")
                else:
                    self.log_result("mongodb_connection", "News Collection Access", False, 
                                  f"Failed to access news collection: {data}")
            else:
                self.log_result("mongodb_connection", "News Collection Access", False, 
                              f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("mongodb_connection", "News Collection Access", False, 
                          f"Connection error: {str(e)}")
            
        # Update category status
        failed_tests = [d for d in self.test_results["mongodb_connection"]["details"] if "❌" in d["status"]]
        self.test_results["mongodb_connection"]["status"] = "failed" if failed_tests else "passed"
        
    def test_authentication_system(self):
        """Test JWT authentication system"""
        print("\n=== Testing Authentication System for Admin ===")
        
        # Test invalid login
        try:
            invalid_creds = {"username": "wrong", "password": "wrong"}
            response = requests.post(f"{API_BASE}/auth/login", 
                                   json=invalid_creds, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 401:
                data = response.json()
                if not data.get("success"):
                    self.log_result("authentication", "Invalid Login Rejection", True, 
                                  f"Correctly rejected invalid credentials: {data.get('message')}")
                else:
                    self.log_result("authentication", "Invalid Login Rejection", False, 
                                  f"Should have rejected invalid credentials but didn't: {data}")
            else:
                self.log_result("authentication", "Invalid Login Rejection", False, 
                              f"Expected 401, got {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("authentication", "Invalid Login Rejection", False, 
                          f"Connection error: {str(e)}")
            
        # Test valid login
        try:
            valid_creds = {"username": "admin", "password": "admin123"}
            response = requests.post(f"{API_BASE}/auth/login", 
                                   json=valid_creds, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("token"):
                    self.auth_token = data["token"]
                    self.log_result("authentication", "Valid Admin Login", True, 
                                  f"Successfully logged in: {data.get('message')}")
                else:
                    self.log_result("authentication", "Valid Admin Login", False, 
                                  f"Login response missing token or success: {data}")
            else:
                self.log_result("authentication", "Valid Admin Login", False, 
                              f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("authentication", "Valid Admin Login", False, 
                          f"Connection error: {str(e)}")
            
        # Test token verification with protected route
        if self.auth_token:
            try:
                headers = {"Authorization": f"Bearer {self.auth_token}"}
                test_news = {
                    "title": "Test Token Verification",
                    "content": "Testing if token works for protected routes",
                    "excerpt": "Token test"
                }
                
                response = requests.post(f"{API_BASE}/news", 
                                       json=test_news, 
                                       headers={**headers, "Content-Type": "application/json"},
                                       timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        self.log_result("authentication", "Token Verification", True, 
                                      "Token successfully verified for protected route")
                    else:
                        self.log_result("authentication", "Token Verification", False, 
                                      f"Token verification failed: {data}")
                else:
                    self.log_result("authentication", "Token Verification", False, 
                                  f"HTTP {response.status_code}: {response.text}")
                    
            except requests.exceptions.RequestException as e:
                self.log_result("authentication", "Token Verification", False, 
                              f"Connection error: {str(e)}")
        else:
            self.log_result("authentication", "Token Verification", False, 
                          "No token available for verification test")
            
        # Update category status
        failed_tests = [d for d in self.test_results["authentication"]["details"] if "❌" in d["status"]]
        self.test_results["authentication"]["status"] = "failed" if failed_tests else "passed"
        
    def test_news_crud_operations(self):
        """Test complete News CRUD operations"""
        print("\n=== Testing News CRUD API Endpoints ===")
        
        if not self.auth_token:
            self.log_result("news_crud", "CRUD Prerequisites", False, 
                          "No authentication token available for CRUD tests")
            self.test_results["news_crud"]["status"] = "failed"
            return
            
        headers = {"Authorization": f"Bearer {self.auth_token}", "Content-Type": "application/json"}
        test_news_slug = None
        
        # Test CREATE news
        try:
            news_data = {
                "title": "Berita Test CRUD Operations",
                "content": "Ini adalah berita test untuk menguji operasi CRUD pada sistem berita desa. Berita ini dibuat secara otomatis oleh sistem testing untuk memastikan semua fungsi berjalan dengan baik.",
                "excerpt": "Berita test untuk operasi CRUD sistem",
                "coverImage": "https://via.placeholder.com/600x400"
            }
            
            response = requests.post(f"{API_BASE}/news", 
                                   json=news_data, 
                                   headers=headers,
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    test_news_slug = data["data"]["slug"]
                    self.log_result("news_crud", "Create News", True, 
                                  f"Successfully created news with slug: {test_news_slug}")
                else:
                    self.log_result("news_crud", "Create News", False, 
                                  f"Create response missing data: {data}")
            else:
                self.log_result("news_crud", "Create News", False, 
                              f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("news_crud", "Create News", False, 
                          f"Connection error: {str(e)}")
            
        # Test READ all news
        try:
            response = requests.get(f"{API_BASE}/news", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    news_count = len(data.get("data", []))
                    self.log_result("news_crud", "Read All News", True, 
                                  f"Successfully retrieved {news_count} news items")
                else:
                    self.log_result("news_crud", "Read All News", False, 
                                  f"Failed to read news: {data}")
            else:
                self.log_result("news_crud", "Read All News", False, 
                              f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("news_crud", "Read All News", False, 
                          f"Connection error: {str(e)}")
            
        # Test READ single news by slug
        if test_news_slug:
            try:
                response = requests.get(f"{API_BASE}/news/{test_news_slug}", timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and data.get("data"):
                        self.log_result("news_crud", "Read Single News", True, 
                                      f"Successfully retrieved news by slug: {test_news_slug}")
                    else:
                        self.log_result("news_crud", "Read Single News", False, 
                                      f"Failed to read single news: {data}")
                else:
                    self.log_result("news_crud", "Read Single News", False, 
                                  f"HTTP {response.status_code}: {response.text}")
                    
            except requests.exceptions.RequestException as e:
                self.log_result("news_crud", "Read Single News", False, 
                              f"Connection error: {str(e)}")
        else:
            self.log_result("news_crud", "Read Single News", False, 
                          "No test news slug available for single read test")
            
        # Test UPDATE news
        if test_news_slug:
            try:
                updated_data = {
                    "title": "Berita Test CRUD Operations - Updated",
                    "content": "Ini adalah berita test yang telah diupdate untuk menguji operasi UPDATE pada sistem CRUD.",
                    "excerpt": "Berita test yang telah diupdate",
                    "coverImage": "https://via.placeholder.com/600x400"
                }
                
                response = requests.put(f"{API_BASE}/news/{test_news_slug}", 
                                      json=updated_data, 
                                      headers=headers,
                                      timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        self.log_result("news_crud", "Update News", True, 
                                      f"Successfully updated news: {data.get('message')}")
                    else:
                        self.log_result("news_crud", "Update News", False, 
                                      f"Update failed: {data}")
                else:
                    self.log_result("news_crud", "Update News", False, 
                                  f"HTTP {response.status_code}: {response.text}")
                    
            except requests.exceptions.RequestException as e:
                self.log_result("news_crud", "Update News", False, 
                              f"Connection error: {str(e)}")
        else:
            self.log_result("news_crud", "Update News", False, 
                          "No test news slug available for update test")
            
        # Test unauthorized access (without token)
        try:
            unauthorized_data = {
                "title": "Unauthorized Test",
                "content": "This should fail",
                "excerpt": "Should fail"
            }
            
            response = requests.post(f"{API_BASE}/news", 
                                   json=unauthorized_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 401:
                data = response.json()
                if not data.get("success"):
                    self.log_result("news_crud", "Unauthorized Access Protection", True, 
                                  f"Correctly blocked unauthorized access: {data.get('message')}")
                else:
                    self.log_result("news_crud", "Unauthorized Access Protection", False, 
                                  f"Should have blocked unauthorized access: {data}")
            else:
                self.log_result("news_crud", "Unauthorized Access Protection", False, 
                              f"Expected 401, got {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("news_crud", "Unauthorized Access Protection", False, 
                          f"Connection error: {str(e)}")
            
        # Test non-existent news slug
        try:
            response = requests.get(f"{API_BASE}/news/non-existent-slug", timeout=10)
            
            if response.status_code == 404:
                data = response.json()
                if not data.get("success"):
                    self.log_result("news_crud", "Non-existent News Handling", True, 
                                  f"Correctly handled non-existent news: {data.get('message')}")
                else:
                    self.log_result("news_crud", "Non-existent News Handling", False, 
                                  f"Should have returned error for non-existent news: {data}")
            else:
                self.log_result("news_crud", "Non-existent News Handling", False, 
                              f"Expected 404, got {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("news_crud", "Non-existent News Handling", False, 
                          f"Connection error: {str(e)}")
            
        # Test DELETE news (cleanup)
        if test_news_slug:
            try:
                response = requests.delete(f"{API_BASE}/news/{test_news_slug}", 
                                         headers=headers,
                                         timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        self.log_result("news_crud", "Delete News", True, 
                                      f"Successfully deleted test news: {data.get('message')}")
                    else:
                        self.log_result("news_crud", "Delete News", False, 
                                      f"Delete failed: {data}")
                else:
                    self.log_result("news_crud", "Delete News", False, 
                                  f"HTTP {response.status_code}: {response.text}")
                    
            except requests.exceptions.RequestException as e:
                self.log_result("news_crud", "Delete News", False, 
                              f"Connection error: {str(e)}")
        else:
            self.log_result("news_crud", "Delete News", False, 
                          "No test news slug available for delete test")
            
        # Update category status
        failed_tests = [d for d in self.test_results["news_crud"]["details"] if "❌" in d["status"]]
        self.test_results["news_crud"]["status"] = "failed" if failed_tests else "passed"
        
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests for Desa Bumi Dipasena Makmur")
        print(f"📍 Testing against: {BASE_URL}")
        print("=" * 60)
        
        # Run tests in order
        self.test_mongodb_connection()
        self.test_authentication_system()
        self.test_news_crud_operations()
        
        # Calculate overall status
        total_tests = self.test_results["overall"]["passed"] + self.test_results["overall"]["failed"]
        if self.test_results["overall"]["failed"] == 0:
            self.test_results["overall"]["status"] = "passed"
        else:
            self.test_results["overall"]["status"] = "failed"
            
        # Print summary
        print("\n" + "=" * 60)
        print("📊 BACKEND TEST SUMMARY")
        print("=" * 60)
        
        for category, result in self.test_results.items():
            if category == "overall":
                continue
                
            status_icon = "✅" if result["status"] == "passed" else "❌"
            print(f"{status_icon} {category.replace('_', ' ').title()}: {result['status'].upper()}")
            
        print(f"\n📈 Overall Results: {self.test_results['overall']['passed']}/{total_tests} tests passed")
        
        if self.test_results["overall"]["failed"] > 0:
            print(f"❌ {self.test_results['overall']['failed']} tests failed")
            print("\n🔍 Failed Test Details:")
            for category, result in self.test_results.items():
                if category == "overall":
                    continue
                failed_details = [d for d in result["details"] if "❌" in d["status"]]
                for detail in failed_details:
                    print(f"   • {detail['test']}: {detail['message']}")
        else:
            print("🎉 All backend tests passed successfully!")
            
        return self.test_results

if __name__ == "__main__":
    tester = BackendTester()
    results = tester.run_all_tests()