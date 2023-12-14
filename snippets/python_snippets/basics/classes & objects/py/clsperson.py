## understanding classes

from datetime import datetime as dt

class Person:

    current_weight = 20 ##stones

    def __init__(self, first, last, age, weight, height):
        self.first = first
        self.last = last
        self.age = age
        self.weight = weight
        self.height = height
    
    ##instance methods

    def full_name(self):
        self.full_name = self.first + " " + self.last
        return self.full_name
    
    def get_current_weight(self):
        self.weight = self.current_weight
        return self.weight
    
    ##class methods
    
    @classmethod
    def alt_const(cls, first, last, weight, height, birth_year):
        age = dt.now().year - birth_year
        return cls(first, last,  age ,weight, height)
    
    def show(self):
        print(f"Name: {self.full_name()}\nAge: {self.age} yrs old\nWeight: {self.weight} stones\nHeight: {self.height} m")
    
    
## test person class
weight = Person.current_weight = 20
person_1 = Person.alt_const("Damian", "Fadahunsi", weight, 1.89, 1995)
person_1.show()
