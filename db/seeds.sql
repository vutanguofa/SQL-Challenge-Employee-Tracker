-- pre-populate data into the employees database

INSERT INTO department (name)
VALUES
    ('Frontend'),
    ('Support'),
    ('Management')
;

INSERT INTO role (title, salary, department_id)
VALUES
    ('CS Agent 1', 29000, 1),
    ('Team Lead', 45000,1),
    ('Supervisor', 70000, 1),
    ('Technical Support', 42000, 2),
    ('IT Support', 54000, 2),
    ('Engineer', 85000, 2),
    ('Project Manager', 102000, 3),
    ('Work Director', 125000, 3),
    ('Director', 200000, 3)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 1),
    ('Jane', 'Smith', 2, 2),
    ('Chris', 'Jackson', 3, 3),
    ('Ryan', 'Johnson', 4, 4),
    ('Jessica', 'Reed', 5, 5),
    ('Michelle', 'Miller', 6, 6),
    ('Amber', 'Jones', 7, 7),
    ('Kathy', 'Lee', 8, 8),
    ('Dan', 'Jordan', 9, 9),
    ('Bobby', 'Miles', 10, null)
;