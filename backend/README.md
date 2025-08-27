# Backend - TT-Line Route Finder API

A Node.js backend service for finding optimal transportation routes between locations using graph algorithms and CSV data processing.

## 🏗️ **Architecture & Design Patterns**

### **Object-Oriented Programming (OOP) Design**

The backend follows **class-based OOP principles** with clear separation of concerns:

#### **1. Class-Based Architecture**

#### **2. Encapsulation & Data Hiding**

- Private methods with underscore prefix convention
- Protected properties with getter access

#### **3. Composition over Inheritance**

### **SOLID Principles Implementation**

#### **1. Single Responsibility Principle (SRP)**

#### **2. Open/Closed Principle (OCP)**
- **Service classes** are open for extension through inheritance
- **Repository pattern** allows different storage implementations
- **Algorithm services** can be extended with new routing strategies

#### **3. Liskov Substitution Principle (LSP)**
- **Repository implementations** can be swapped without breaking controllers
- **Service implementations** maintain consistent interfaces
- **Model classes** provide consistent method signatures

#### **4. Interface Segregation Principle (ISP)**
- **Controllers** only depend on the methods they actually use
- **Services** expose minimal, focused interfaces
- **Models** provide specific, purpose-built methods

#### **5. Dependency Inversion Principle (DIP)**

- High-level modules depend on abstractions, not concrete implementations - like controllers
- Dependencies are injected at the application level


### **Clean Architecture Benefits**

#### **1. Separation of Concerns**
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Represent domain entities
- **Repositories**: Manage data access

#### **2. Testability**
- **Dependency injection** enables easy mocking
- **Single responsibilities** make unit testing straightforward
- **Clear interfaces** allow for integration testing

#### **3. Maintainability**
- **Modular structure** makes code changes isolated
- **Consistent patterns** reduce cognitive load
- **Clear dependencies** make refactoring safer

#### **4. Scalability**
- **Service abstraction** allows for horizontal scaling
- **Repository pattern** enables database switching
- **Algorithm services** can be optimized independently

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn

### **Installation**
```bash
cd backend
npm install
```

### **Running the Application**
```bash
# Development mode
npm run dev
```


## 📊 **API Endpoints**

### **Authentication**
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout

### **Data Management**
- `POST /api/data/upload` - Upload CSV departure data
- `GET /api/data/departures` - Retrieve paginated departures
- `GET /api/data/locations` - Get all unique location codes

### **Route Finding**
- `GET /api/routes/find` - Find optimal routes between locations

