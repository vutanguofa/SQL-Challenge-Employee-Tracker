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
    ('Team Lead', 45000,2),
    ('Supervisor', 70000, 3),
    ('Technical Support', 42000, 4),
    ('IT Support', 54000, 5),
    ('Engineer', 85000, 6),
    ('Project Manager', 102000, 7),
    ('Work Director', 125000, 8),
    ('Director', 200000, 9)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 1010),
    ('Jane', 'Smith', 2, 2020),
    ('Chris', 'Jackson', 3, 3030),
    ('Ryan', 'Johnson', 4, 4040),
    ('Jessica', 'Reed', 5, 5050),
    ('Michelle', 'Miller', 6, 6060),
    ('Amber', 'Jones', 7, 7070),
    ('Kathy', 'Lee', 8, 8080),
    ('Dan', 'Jordan', 9, 9090),
    ('Bobby', 'Miles', 10, null)
;