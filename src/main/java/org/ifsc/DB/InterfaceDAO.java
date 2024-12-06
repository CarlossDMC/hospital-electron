package org.ifsc.DB;

import java.sql.SQLException;
import java.util.List;

public interface InterfaceDAO<T> {
    T save();
    List<T> findAll();
    T findById(Long id) throws SQLException;
    List<T> findByAttribute(String attr, Object value);
    void update(T objeto);
    void delete(T objeto);
}