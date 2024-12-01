#include "polynomial.h"

// Constructor
Polynomial::Polynomial(int deg) : degree(deg) {
    coeff = new double[degree + 1]{0};
}

// Constructor sao chép
Polynomial::Polynomial(const Polynomial& p) : degree(p.degree) {
    coeff = new double[degree + 1];
    for (int i = 0; i <= degree; ++i) {
        coeff[i] = p.coeff[i];
    }
}

// Destructor
Polynomial::~Polynomial() {
    delete[] coeff;
}

// Toán tử gán
Polynomial& Polynomial::operator=(const Polynomial& p) {
    if (this != &p) {
        delete[] coeff;

        degree = p.degree;
        coeff = new double[degree + 1];
        for (int i = 0; i <= degree; ++i) {
            coeff[i] = p.coeff[i];
        }
    }
    return *this;
}

// Toán tử +
Polynomial Polynomial::operator+(const Polynomial& p) {
    int maxDegree = max(degree, p.degree);
    Polynomial result(maxDegree);

    for (int i = 0; i <= maxDegree; ++i) {
        if (i <= degree) result.coeff[i] += coeff[i];
        if (i <= p.degree) result.coeff[i] += p.coeff[i];
    }

    return result;
}

// Toán tử -
Polynomial Polynomial::operator-(const Polynomial& p) {
    int maxDegree = max(degree, p.degree);
    Polynomial result(maxDegree);

    for (int i = 0; i <= maxDegree; ++i) {
        if (i <= degree) result.coeff[i] += coeff[i];
        if (i <= p.degree) result.coeff[i] -= p.coeff[i];
    }

    return result;
}

// Toán tử *
Polynomial Polynomial::operator*(const Polynomial& p) {
    int newDegree = degree + p.degree;
    Polynomial result(newDegree);

    for (int i = 0; i <= degree; ++i) {
        for (int j = 0; j <= p.degree; ++j) {
            result.coeff[i + j] += coeff[i] * p.coeff[j];
        }
    }

    return result;
}

// Truy cập hệ số
double Polynomial::operator[](int index) const {
    if (index < 0 || index > degree) {
        throw out_of_range("Index out of range.");
    }
    return coeff[index];
}

// Nhập
istream& operator>>(istream& in, Polynomial& p) {
    for (int i = 0; i <= p.degree; ++i) {
        in >> p.coeff[i];
    }
    return in;
}

// Xuất
ostream& operator<<(ostream& out, const Polynomial& p) {
    for (int i = p.degree; i >= 0; --i) {
        out << p.coeff[i];
        if (i > 0) out << "x^" << i << " + ";
    }
    return out;
}