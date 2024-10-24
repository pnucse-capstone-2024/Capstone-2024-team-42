package node.connection.entity.pk;

import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class CourtKey implements Serializable {
    private String court;
    private String support;
    private String office;

    @Builder
    public CourtKey(String court, String support, String office) {
        this.court = court;
        this.support = support;
        this.office = office;
    }
}