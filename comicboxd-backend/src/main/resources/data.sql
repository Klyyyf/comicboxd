INSERT INTO tb_roles (role_id, role_name) VALUES (1, 'admin')
    ON CONFLICT (role_id) DO NOTHING;
INSERT INTO tb_roles (role_id, role_name) VALUES (2, 'basic')
    ON CONFLICT (role_id) DO NOTHING;
