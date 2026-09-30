import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComponent } from './listado.component';
import { CancionService } from '../../components/services/cancion.service';
import { ToasterService } from '../../shared/utils/toaster.service';
import { I18nService } from '../../shared/i18n/i18n.service';

describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CancionService, useValue: {} },
        { provide: ToasterService, useValue: {} },
        { provide: I18nService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
