<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221205141439 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE expense_claim (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, patient_study_site_visit_id INT NOT NULL, expense_claim_status_id INT DEFAULT NULL, INDEX IDX_461791D6B899279 (patient_id), INDEX IDX_461791D406BC591 (patient_study_site_visit_id), UNIQUE INDEX UNIQ_461791D40355A40 (expense_claim_status_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE expense_claim_item (id INT AUTO_INCREMENT NOT NULL, expense_claim_id INT NOT NULL, expense_type_id INT DEFAULT NULL, expense_currency_id INT NOT NULL, expense_claim_item_status_id INT DEFAULT NULL, amount INT DEFAULT NULL, additional_info LONGTEXT DEFAULT NULL, INDEX IDX_E1008D33B6F76666 (expense_claim_id), INDEX IDX_E1008D33A857C7A9 (expense_type_id), INDEX IDX_E1008D3341482DED (expense_currency_id), INDEX IDX_E1008D339762D220 (expense_claim_item_status_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE expense_claim_item_receipt (id INT AUTO_INCREMENT NOT NULL, expense_claim_item_id INT NOT NULL, data LONGBLOB NOT NULL, INDEX IDX_D0E666FBCE41781E (expense_claim_item_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE expense_claim_item_status (id INT AUTO_INCREMENT NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE expense_claim_status (id INT AUTO_INCREMENT NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE expense_currency (id INT AUTO_INCREMENT NOT NULL, currency VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE expense_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient (id INT AUTO_INCREMENT NOT NULL, registration INT DEFAULT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient_address (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, address_line_1 VARCHAR(255) NOT NULL, address_line_2 VARCHAR(255) DEFAULT NULL, address_line_3 VARCHAR(255) DEFAULT NULL, address_line_4 VARCHAR(255) DEFAULT NULL, area_code VARCHAR(255) NOT NULL, country_code VARCHAR(255) NOT NULL, is_primary TINYINT(1) NOT NULL, INDEX IDX_502D3A6A6B899279 (patient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient_stripe_account (id INT AUTO_INCREMENT NOT NULL, patient_id INT DEFAULT NULL, stripe_account_uuid VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_E8E0D6156B899279 (patient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient_study_site_visit (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, study_id INT NOT NULL, site_id INT NOT NULL, visit_timestamp DATETIME NOT NULL, INDEX IDX_AF53F2996B899279 (patient_id), INDEX IDX_AF53F299E7B003E9 (study_id), INDEX IDX_AF53F299F6BD1646 (site_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE site (id INT AUTO_INCREMENT NOT NULL, site_reference VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE study (id INT AUTO_INCREMENT NOT NULL, study_reference VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE expense_claim ADD CONSTRAINT FK_461791D6B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE expense_claim ADD CONSTRAINT FK_461791D406BC591 FOREIGN KEY (patient_study_site_visit_id) REFERENCES patient_study_site_visit (id)');
        $this->addSql('ALTER TABLE expense_claim ADD CONSTRAINT FK_461791D40355A40 FOREIGN KEY (expense_claim_status_id) REFERENCES expense_claim_status (id)');
        $this->addSql('ALTER TABLE expense_claim_item ADD CONSTRAINT FK_E1008D33B6F76666 FOREIGN KEY (expense_claim_id) REFERENCES expense_claim (id)');
        $this->addSql('ALTER TABLE expense_claim_item ADD CONSTRAINT FK_E1008D33A857C7A9 FOREIGN KEY (expense_type_id) REFERENCES expense_type (id)');
        $this->addSql('ALTER TABLE expense_claim_item ADD CONSTRAINT FK_E1008D3341482DED FOREIGN KEY (expense_currency_id) REFERENCES expense_currency (id)');
        $this->addSql('ALTER TABLE expense_claim_item ADD CONSTRAINT FK_E1008D339762D220 FOREIGN KEY (expense_claim_item_status_id) REFERENCES expense_claim_item_status (id)');
        $this->addSql('ALTER TABLE expense_claim_item_receipt ADD CONSTRAINT FK_D0E666FBCE41781E FOREIGN KEY (expense_claim_item_id) REFERENCES expense_claim_item (id)');
        $this->addSql('ALTER TABLE patient_address ADD CONSTRAINT FK_502D3A6A6B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE patient_stripe_account ADD CONSTRAINT FK_E8E0D6156B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE patient_study_site_visit ADD CONSTRAINT FK_AF53F2996B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE patient_study_site_visit ADD CONSTRAINT FK_AF53F299E7B003E9 FOREIGN KEY (study_id) REFERENCES study (id)');
        $this->addSql('ALTER TABLE patient_study_site_visit ADD CONSTRAINT FK_AF53F299F6BD1646 FOREIGN KEY (site_id) REFERENCES site (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE expense_claim DROP FOREIGN KEY FK_461791D6B899279');
        $this->addSql('ALTER TABLE expense_claim DROP FOREIGN KEY FK_461791D406BC591');
        $this->addSql('ALTER TABLE expense_claim DROP FOREIGN KEY FK_461791D40355A40');
        $this->addSql('ALTER TABLE expense_claim_item DROP FOREIGN KEY FK_E1008D33B6F76666');
        $this->addSql('ALTER TABLE expense_claim_item DROP FOREIGN KEY FK_E1008D33A857C7A9');
        $this->addSql('ALTER TABLE expense_claim_item DROP FOREIGN KEY FK_E1008D3341482DED');
        $this->addSql('ALTER TABLE expense_claim_item DROP FOREIGN KEY FK_E1008D339762D220');
        $this->addSql('ALTER TABLE expense_claim_item_receipt DROP FOREIGN KEY FK_D0E666FBCE41781E');
        $this->addSql('ALTER TABLE patient_address DROP FOREIGN KEY FK_502D3A6A6B899279');
        $this->addSql('ALTER TABLE patient_stripe_account DROP FOREIGN KEY FK_E8E0D6156B899279');
        $this->addSql('ALTER TABLE patient_study_site_visit DROP FOREIGN KEY FK_AF53F2996B899279');
        $this->addSql('ALTER TABLE patient_study_site_visit DROP FOREIGN KEY FK_AF53F299E7B003E9');
        $this->addSql('ALTER TABLE patient_study_site_visit DROP FOREIGN KEY FK_AF53F299F6BD1646');
        $this->addSql('DROP TABLE expense_claim');
        $this->addSql('DROP TABLE expense_claim_item');
        $this->addSql('DROP TABLE expense_claim_item_receipt');
        $this->addSql('DROP TABLE expense_claim_item_status');
        $this->addSql('DROP TABLE expense_claim_status');
        $this->addSql('DROP TABLE expense_currency');
        $this->addSql('DROP TABLE expense_type');
        $this->addSql('DROP TABLE patient');
        $this->addSql('DROP TABLE patient_address');
        $this->addSql('DROP TABLE patient_stripe_account');
        $this->addSql('DROP TABLE patient_study_site_visit');
        $this->addSql('DROP TABLE site');
        $this->addSql('DROP TABLE study');
    }
}
